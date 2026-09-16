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
}
