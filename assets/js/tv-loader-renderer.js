// WebGL (with Canvas2D fallback) renderer for the TV-static loader.
// Owns a single GL context for the page's lifetime — created once, reused
// for every transition, so repeated navigations never leak contexts.
function createTVRenderer(canvas) {
  const RENDER_W = 320
  const RENDER_H = 180

  canvas.width = RENDER_W
  canvas.height = RENDER_H

  const gl =
    canvas.getContext('webgl', { antialias: false, alpha: false }) ||
    canvas.getContext('experimental-webgl', { antialias: false, alpha: false })

  if (!gl) {
    return create2DFallback(canvas)
  }

  function compile(type, src) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, src)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  const vertexShader = compile(gl.VERTEX_SHADER, TV_VERTEX_SRC)
  const fragmentShader = compile(gl.FRAGMENT_SHADER, TV_FRAGMENT_SRC)

  if (!vertexShader || !fragmentShader) {
    return create2DFallback(canvas)
  }

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return create2DFallback(canvas)
  }

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  )

  const posLoc = gl.getAttribLocation(program, 'a_pos')
  const timeLoc = gl.getUniformLocation(program, 'u_time')
  const resLoc = gl.getUniformLocation(program, 'u_resolution')
  const seedLoc = gl.getUniformLocation(program, 'u_seed')
  const intensityLoc = gl.getUniformLocation(program, 'u_intensity')

  gl.viewport(0, 0, RENDER_W, RENDER_H)

  let rafId = null
  let seed = Math.random() * 100
  let intensity = 1

  function draw(timeSeconds) {
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.uniform1f(timeLoc, timeSeconds)
    gl.uniform2f(resLoc, RENDER_W, RENDER_H)
    gl.uniform1f(seedLoc, seed)
    gl.uniform1f(intensityLoc, intensity)

    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  return {
    setSeed(next) {
      seed = next
    },
    setIntensity(next) {
      intensity = next
    },
    drawStaticFrame() {
      draw(0)
    },
    start() {
      if (rafId !== null) return
      const startedAt = performance.now()
      const loop = () => {
        draw((performance.now() - startedAt) / 1000)
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    },
    stop() {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    },
  }
}

// Canvas2D fallback — same bar layout plus cheap random grain, for browsers
// without WebGL. Noise buffer is precomputed and refreshed every 2 frames
// rather than redrawn per-pixel every frame.
function create2DFallback(canvas) {
  const W = 160
  const H = 90
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return {
      setSeed() {},
      setIntensity() {},
      drawStaticFrame() {},
      start() {},
      stop() {},
    }
  }

  const TOP_COLORS = ['#c0c0c0', '#c0c000', '#00c0c0', '#00c000', '#c000c0', '#c00000', '#0000c0']
  const MID_COLORS = ['#0000c0', '#101010', '#c000c0', '#101010', '#00c0c0', '#101010', '#c0c0c0']
  const BOTTOM_COLORS = ['#2a2a2a', '#3a3a3a', '#1c1c1c']

  function drawBars() {
    const barW = W / 7
    for (let i = 0; i < 7; i++) {
      ctx.fillStyle = TOP_COLORS[i]
      ctx.fillRect(i * barW, 0, barW + 1, H * 0.85)
      ctx.fillStyle = MID_COLORS[i]
      ctx.fillRect(i * barW, H * 0.85, barW + 1, H * 0.08)
    }
    const bottomY = H * 0.93
    const bottomBarW = W / 7
    for (let i = 0; i < 7; i++) {
      ctx.fillStyle = BOTTOM_COLORS[i % BOTTOM_COLORS.length]
      ctx.fillRect(i * bottomBarW, bottomY, bottomBarW + 1, H - bottomY)
    }
  }

  let noiseBuffer = null
  let frame = 0
  let rafId = null
  let intensity = 1

  function refreshNoise() {
    const imageData = ctx.getImageData(0, 0, W, H)
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      const n = Math.random() * 255
      data[i] = n
      data[i + 1] = n
      data[i + 2] = n
      data[i + 3] = 60 * intensity
    }
    noiseBuffer = imageData
  }

  function draw() {
    drawBars()
    if (frame % 2 === 0 || !noiseBuffer) refreshNoise()
    ctx.putImageData(noiseBuffer, 0, 0)
    frame++
  }

  return {
    setSeed() {},
    setIntensity(next) {
      intensity = next
    },
    drawStaticFrame() {
      draw()
    },
    start() {
      if (rafId !== null) return
      const loop = () => {
        draw()
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    },
    stop() {
      if (rafId !== null) cancelAnimationFrame(rafId)
      rafId = null
    },
  }
}
