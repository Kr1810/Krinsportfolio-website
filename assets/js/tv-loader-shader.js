// GLSL sources for the TV-static page-transition loader (assets/js/tv-loader.js).
// WebGL1 syntax (attribute/varying) for the broadest device support.
const TV_VERTEX_SRC = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = a_pos * 0.5 + 0.5;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`

const TV_FRAGMENT_SRC = `
  precision mediump float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_seed;
  uniform float u_intensity;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21) + u_seed);
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // 7-bar top band, 75% intensity color bars (gray, yellow, cyan, green, magenta, red, blue).
  vec3 barColor(float x) {
    float i = floor(clamp(x, 0.0, 0.9999) * 7.0);
    if (i < 1.0) return vec3(0.753, 0.753, 0.753);
    if (i < 2.0) return vec3(0.753, 0.753, 0.0);
    if (i < 3.0) return vec3(0.0, 0.753, 0.753);
    if (i < 4.0) return vec3(0.0, 0.753, 0.0);
    if (i < 5.0) return vec3(0.753, 0.0, 0.753);
    if (i < 6.0) return vec3(0.753, 0.0, 0.0);
    return vec3(0.0, 0.0, 0.753);
  }

  vec3 midColor(float x) {
    float i = floor(clamp(x, 0.0, 0.9999) * 7.0);
    vec3 blue = vec3(0.0, 0.0, 0.753);
    vec3 black = vec3(0.063, 0.063, 0.063);
    vec3 magenta = vec3(0.753, 0.0, 0.753);
    vec3 cyan = vec3(0.0, 0.753, 0.753);
    vec3 gray = vec3(0.753, 0.753, 0.753);
    if (i < 1.0) return blue;
    if (i < 2.0) return black;
    if (i < 3.0) return magenta;
    if (i < 4.0) return black;
    if (i < 5.0) return cyan;
    if (i < 6.0) return black;
    return gray;
  }

  vec3 bottomColor(float x) {
    vec3 a = vec3(0.165, 0.165, 0.165); // #2a2a2a
    vec3 b = vec3(0.227, 0.227, 0.227); // #3a3a3a
    vec3 c = vec3(0.110, 0.110, 0.110); // #1c1c1c
    float t = clamp(x, 0.0, 0.999);
    vec3 base = mix(a, b, step(0.5, fract(t * 7.0)));
    return mix(base, c, t);
  }

  vec3 barsAt(vec2 uv) {
    float y = 1.0 - uv.y;
    if (y < 0.85) return barColor(uv.x);
    if (y < 0.93) return midColor(uv.x);
    return bottomColor(uv.x);
  }

  void main() {
    vec2 uv = v_uv;
    float t = floor(u_time * 24.0) / 24.0; // 24fps step for a choppy analog feel

    // Occasional horizontal line-jitter: a thin slice shifts sideways.
    float rowId = floor(uv.y * 48.0);
    float jitterRoll = hash(vec2(rowId, floor(t * 6.0)));
    float jitterActive = step(0.92, jitterRoll);
    float jitterShift = (hash(vec2(rowId * 3.1, floor(t * 6.0) + 7.0)) - 0.5) * 0.02 * jitterActive;
    vec2 buv = vec2(uv.x + jitterShift, uv.y);

    // Chromatic aberration — sample the bars with R/B offset in x.
    float px = 1.5 / u_resolution.x;
    float r = barsAt(vec2(buv.x + px, buv.y)).r;
    float g = barsAt(buv).g;
    float b = barsAt(vec2(buv.x - px, buv.y)).b;
    vec3 color = vec3(r, g, b);

    // Per-pixel static.
    float grain = hash(uv * u_resolution * 1.0 + t * 97.0);
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    vec3 grainColor = vec3(grain) * 0.6 + luma * 0.4;
    color = mix(color, grainColor, 0.35);

    // Horizontal streaks — low frequency in x, high frequency in y/time.
    float streak = hash(vec2(rowId, t * 240.0));
    color += (streak - 0.5) * 0.18;

    // Rolling band, bottom to top, ~2.5s cycle.
    float bandY = fract(u_time / 2.5 + u_seed);
    float bandDist = abs((1.0 - uv.y) - bandY);
    float band = smoothstep(0.08, 0.0, bandDist) * 0.25;
    color += band;

    // Scanlines.
    float scan = sin(uv.y * u_resolution.y * 3.14159265);
    color *= 1.0 - 0.12 * (0.5 + 0.5 * scan);

    // Vignette.
    vec2 centered = uv - 0.5;
    float vig = 1.0 - dot(centered, centered) * 1.1;
    color *= clamp(vig, 0.6, 1.0);

    // Flicker.
    float flicker = 1.0 + (hash(vec2(t * 13.0, 0.0)) - 0.5) * 0.08;
    color *= flicker;

    // Desaturate to ~85%.
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, 0.85);

    color *= mix(0.7, 1.25, u_intensity);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`
