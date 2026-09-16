// Scroll-reveal for the About (ABOUT_ME.txt) section.
// Uses the shared reveal utility in assets/js/reveal.js.
const aboutFile = document.querySelector('.about-file')

if (aboutFile) {
  const revealEls = aboutFile.querySelectorAll('.about-file__reveal')
  initScrollReveal(revealEls, 'about-file__reveal--visible')
}
