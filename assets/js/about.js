// Scroll-reveal for the About (ABOUT_ME.txt) section.
// Reuses the same IntersectionObserver + reduced-motion pattern as assets/js/selected-work.js.
const aboutFile = document.querySelector('.about-file')

if (aboutFile) {
  const revealEls = aboutFile.querySelectorAll('.about-file__reveal')
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-file__reveal--visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    revealEls.forEach((el) => revealObserver.observe(el))
  } else {
    revealEls.forEach((el) => el.classList.add('about-file__reveal--visible'))
  }
}
