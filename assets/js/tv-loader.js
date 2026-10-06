// TV-static page-transition loader — plays on every real page navigation
// (index.html <-> project-N.html) and on every fresh load of a page,
// including plain refreshes. Adapted from a React/Vite + React-Router
// brief to this site's actual stack: a plain multi-page site with no
// bundler and no router, so "route change" here means an actual
// cross-document navigation, and continuity across that navigation is
// carried via sessionStorage rather than client-side router state.
;(function () {
  const CHANNEL_MAP = {
    '': 'CH 01 HOME',
    'index.html': 'CH 01 HOME',
    'project-1.html': 'CH 02 RESTRO',
    'project-2.html': 'CH 03 LOGIN FLOW',
    'project-3.html': 'CH 04 WIREFRAME',
    'project-4.html': 'CH 05 EMAIL TEMPLATE',
  }

  const TIMING = {
    enter: 220,
    minHold: 700,
    maxHold: 4000,
    exitTotal: 300,
    reducedFade: 200,
    reducedMinHold: 300,
  }

  const PENDING_KEY = 'tvLoaderPending'
  const SEED_KEY = 'tvLoaderSeed'

  function channelFor(pathname) {
    const file = pathname.split('/').pop()
    return CHANNEL_MAP[file] || 'CH 00 NO SIGNAL'
  }

  function resolveInternalNav(anchor) {
    if (!anchor || !anchor.getAttribute('href')) return null
    if (anchor.target && anchor.target !== '' && anchor.target !== '_self') return null
    if (anchor.hasAttribute('download')) return null

    let url
    try {
      url = new URL(anchor.href, window.location.href)
    } catch (e) {
      return null
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:' && url.protocol !== 'file:') return null
    if (url.origin !== window.location.origin) return null
    if (url.pathname === window.location.pathname) return null // same document, let it scroll

    return url
  }

  function buildOverlay() {
    const container = document.createElement('div')
    container.className = 'tv-loader'
    container.hidden = true

    const stage = document.createElement('div')
    stage.className = 'tv-loader__stage'

    const canvas = document.createElement('canvas')
    canvas.className = 'tv-loader__canvas'
    canvas.setAttribute('aria-hidden', 'true')
    stage.appendChild(canvas)

    const flash = document.createElement('div')
    flash.className = 'tv-loader__flash'
    stage.appendChild(flash)

    const channelLabel = document.createElement('div')
    channelLabel.className = 'tv-loader__channel'
    const channelText = document.createElement('span')
    const channelCursor = document.createElement('span')
    channelCursor.className = 'tv-loader__cursor'
    channelCursor.textContent = '▎' // ▮
    channelLabel.appendChild(channelText)
    channelLabel.appendChild(channelCursor)
    stage.appendChild(channelLabel)

    const signalLabel = document.createElement('div')
    signalLabel.className = 'tv-loader__signal'
    signalLabel.textContent = 'KRINA SUTHAR · NO SIGNAL'
    stage.appendChild(signalLabel)

    container.appendChild(stage)

    const liveRegion = document.createElement('div')
    liveRegion.className = 'visually-hidden'
    liveRegion.setAttribute('role', 'status')
    liveRegion.setAttribute('aria-live', 'polite')
    document.body.appendChild(liveRegion)
    document.body.appendChild(container)

    return { container, stage, canvas, channelText, liveRegion }
  }

  function main() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mainEl = document.getElementById('main-content') || document.querySelector('main')

    const dom = buildOverlay()
    const renderer = createTVRenderer(dom.canvas)

    let phase = 'idle'

    function announce(label) {
      dom.liveRegion.textContent = ''
      requestAnimationFrame(() => {
        dom.liveRegion.textContent = 'Loading ' + label.replace(/^CH \d+\s*/, '').trim() + ' page'
      })
    }

    function open(channelLabel) {
      dom.channelText.textContent = channelLabel
      dom.container.hidden = false
      if (mainEl) mainEl.setAttribute('aria-busy', 'true')
      announce(channelLabel)
    }

    function close() {
      dom.container.hidden = true
      dom.container.classList.remove('tv-loader--visible')
      dom.stage.className = 'tv-loader__stage'
      if (mainEl) mainEl.removeAttribute('aria-busy')
      renderer.stop()
      phase = 'idle'
    }

    function focusHeading() {
      const heading = document.querySelector('main h1, h1')
      if (!heading) return
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
      try {
        heading.focus({ preventScroll: true })
      } catch (e) {
        heading.focus()
      }
    }

    function waitForReady(minHold) {
      const readyPromise = new Promise((resolve) => {
        if (document.readyState === 'complete') resolve()
        else window.addEventListener('load', () => resolve(), { once: true })
      })
      const minHoldPromise = new Promise((resolve) => setTimeout(resolve, minHold))
      const hardCap = new Promise((resolve) => setTimeout(resolve, TIMING.maxHold))
      return Promise.race([Promise.all([readyPromise, minHoldPromise]), hardCap])
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }

    // Plays HOLD -> EXIT on a freshly-loaded document. The ENTER half (if
    // any) already happened on the PREVIOUS document, immediately before
    // navigation — this document starts already fully covered.
    function playOnLoad(channelLabel, seed) {
      if (phase !== 'idle') return
      phase = 'hold'
      renderer.setSeed(seed)
      renderer.setIntensity(1)
      open(channelLabel)

      if (prefersReducedMotion) {
        dom.stage.classList.add('tv-loader__stage--reduced')
        renderer.drawStaticFrame()
        requestAnimationFrame(() => dom.container.classList.add('tv-loader--visible'))
        waitForReady(TIMING.reducedMinHold).then(() => {
          dom.container.classList.remove('tv-loader--visible')
          delay(TIMING.reducedFade).then(() => {
            close()
            focusHeading()
          })
        })
        return
      }

      dom.stage.classList.add('tv-loader__stage--held')
      renderer.start()
      waitForReady(TIMING.minHold).then(() => {
        phase = 'exit'
        renderer.setIntensity(1.3)
        dom.stage.classList.add('tv-loader__stage--exiting')
        delay(TIMING.exitTotal).then(() => {
          close()
          focusHeading()
        })
      })
    }

    // Covers the CURRENT document, then hands off to a real navigation —
    // the destination document's own copy of this script picks up the
    // HOLD via the sessionStorage flag set just before navigating.
    function coverAndNavigate(url) {
      if (phase !== 'idle') return
      phase = 'enter'
      const seed = Math.random() * 100
      renderer.setSeed(seed)
      renderer.setIntensity(1)
      open(channelFor(url.pathname))

      const goNow = () => {
        try {
          sessionStorage.setItem(PENDING_KEY, '1')
          sessionStorage.setItem(SEED_KEY, String(seed))
        } catch (e) {}
        window.location.href = url.pathname + url.search + url.hash
      }

      if (prefersReducedMotion) {
        dom.stage.classList.add('tv-loader__stage--reduced')
        renderer.drawStaticFrame()
        requestAnimationFrame(() => dom.container.classList.add('tv-loader--visible'))
        delay(TIMING.reducedFade).then(goNow)
        return
      }

      renderer.start()
      dom.stage.classList.add('tv-loader__stage--flash', 'tv-loader__stage--entering')
      delay(TIMING.enter).then(goNow)
    }

    // --- Session continuity across a real page load -------------------
    let pendingSeed = null
    try {
      if (sessionStorage.getItem(PENDING_KEY) === '1') {
        pendingSeed = parseFloat(sessionStorage.getItem(SEED_KEY))
        if (isNaN(pendingSeed)) pendingSeed = Math.random() * 100
        sessionStorage.removeItem(PENDING_KEY)
        sessionStorage.removeItem(SEED_KEY)
      }
    } catch (e) {}

    document.documentElement.classList.remove('tv-pending')

    playOnLoad(channelFor(window.location.pathname), pendingSeed !== null ? pendingSeed : Math.random() * 100)

    // --- Click interception for internal navigation --------------------
    document.addEventListener('click', (event) => {
      if (phase !== 'idle') return
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest('a[href]')
      const url = resolveInternalNav(anchor)
      if (!url) return

      event.preventDefault()
      coverAndNavigate(url)
    })

    // --- Back/forward from the bfcache: hard cut, no re-fetch ----------
    window.addEventListener('pageshow', (event) => {
      if (event.persisted && phase === 'idle') {
        playOnLoad(channelFor(window.location.pathname), Math.random() * 100)
      }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
  } else {
    main()
  }
})()
