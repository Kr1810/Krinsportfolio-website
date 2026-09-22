// Scroll-reveal for the Studio board section.
// Uses the shared reveal utility in assets/js/reveal.js.
const studioBoard = document.querySelector('.studio-board')

if (studioBoard) {
  const revealEls = studioBoard.querySelectorAll('.studio-board__reveal')
  initScrollReveal(revealEls, 'studio-board__reveal--visible')

  const revealTiles = studioBoard.querySelectorAll('.studio-board__tile')
  initScrollReveal(revealTiles, 'studio-board__tile--visible')

  const revealFloatCards = studioBoard.querySelectorAll('.studio-board__float-card')
  initScrollReveal(revealFloatCards, 'studio-board__float-card--visible')
}
