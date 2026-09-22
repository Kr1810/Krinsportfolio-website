// Footer: current year + scroll-reveal (shared utility in assets/js/reveal.js).
// Runs on every page (index + project case studies) since each has its own footer.
const footerYearEl = document.getElementById('footerYear')
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear()
}

const mainFooter = document.querySelector('.main-footer')

if (mainFooter) {
  const revealEls = mainFooter.querySelectorAll('.main-footer__reveal')
  // No negative bottom rootMargin here: the footer is the last thing on the
  // page, so there's no room to scroll "past" it the way other sections can —
  // a shrunk root would leave its last row below the reveal threshold.
  initScrollReveal(revealEls, 'main-footer__reveal--visible', {
    threshold: 0.1,
    rootMargin: '0px',
  })

  // Eye illustration — pupils track the cursor anywhere on the page, not
  // just while hovering the footer itself, so they're already "looking"
  // wherever the cursor is once the footer scrolls into view.
  const eyesSvg = mainFooter.querySelector('.main-footer__eyes-svg')
  const pupils = mainFooter.querySelectorAll('.main-footer__pupil')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (eyesSvg && pupils.length && !prefersReducedMotion) {
    const restPositions = Array.from(pupils).map((pupil) => ({
      x: parseFloat(pupil.dataset.restX),
      y: parseFloat(pupil.dataset.restY),
    }))
    const MAX_OFFSET = 12 // px, in the SVG's own coordinate space — far enough that the iris reaches the eye outline

    let ticking = false
    let lastX = 0
    let lastY = 0

    function updatePupils() {
      ticking = false
      const rect = eyesSvg.getBoundingClientRect()
      if (rect.width === 0) return
      const viewBox = eyesSvg.viewBox.baseVal
      const scaleX = rect.width / viewBox.width
      const scaleY = rect.height / viewBox.height

      pupils.forEach((pupil, i) => {
        const rest = restPositions[i]
        const originX = rect.left + rest.x * scaleX
        const originY = rect.top + rest.y * scaleY
        const dx = lastX - originX
        const dy = lastY - originY
        const angle = Math.atan2(dy, dx)
        const dist = Math.min(MAX_OFFSET, Math.hypot(dx, dy) / 12)
        const offsetX = Math.cos(angle) * dist
        const offsetY = Math.sin(angle) * dist
        pupil.setAttribute('transform', `translate(${offsetX} ${offsetY})`)
      })
    }

    window.addEventListener(
      'mousemove',
      (event) => {
        lastX = event.clientX
        lastY = event.clientY
        if (!ticking) {
          ticking = true
          window.requestAnimationFrame(updatePupils)
        }
      },
      { passive: true }
    )
  }
}
