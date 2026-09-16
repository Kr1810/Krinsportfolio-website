// Shared scroll-reveal utility — the single IntersectionObserver implementation
// used by every section script (about/toolbox/experience/selected-work/contact/footer.js).
// Keeping one copy here instead of six near-identical ones per section.
function initScrollReveal(elements, visibleClass, options) {
  const opts = options || {}
  const els =
    elements instanceof NodeList || Array.isArray(elements)
      ? elements
      : [elements]

  if (!els.length) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(visibleClass)
            revealObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: opts.threshold !== undefined ? opts.threshold : 0.15,
        rootMargin:
          opts.rootMargin !== undefined ? opts.rootMargin : '0px 0px -80px 0px',
      }
    )
    els.forEach((el) => revealObserver.observe(el))
  } else {
    els.forEach((el) => el.classList.add(visibleClass))
  }
}
