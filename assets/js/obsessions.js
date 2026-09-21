// "OBSESSIONS/" — a personal photography section. Data-driven on purpose:
// there are only 3 photos today, but adding more later is just adding an
// entry here and dropping the matching .webp file into
// images/portfolio-assets/krina-photos/ — no layout or markup changes needed,
// the CSS multi-column layout in sass/pages/_obsessions.scss reflows on its own.
const OBSESSIONS = [
  {
    id: 'obsession-01',
    src: './images/portfolio-assets/krina-photos/obsession-01.webp',
    width: 1400,
    height: 2120,
    alt: 'A portrait of Krina Suthar',
    caption: 'Camera timer, three takes, one keeper.',
  },
  {
    id: 'obsession-02',
    src: './images/portfolio-assets/krina-photos/obsession-02.webp',
    width: 1400,
    height: 2124,
    alt: 'A portrait of Krina Suthar',
    caption: 'Taking myself a little too seriously, on purpose.',
  },
  {
    id: 'obsession-03',
    src: './images/portfolio-assets/krina-photos/obsession-03.webp',
    width: 1400,
    height: 2124,
    alt: 'A portrait of Krina Suthar',
    caption: 'The face behind the file names.',
  },
  // Add more entries here as new photos come in — include width/height (the
  // image's real intrinsic size) so the browser can reserve layout space
  // before the file loads, same as every other image on this site.
]

function obsessionCardHTML(photo, index) {
  return `
    <figure class="obsessions__item obsessions__reveal" style="--card-i: ${index}">
      <img
        src="${photo.src}"
        width="${photo.width}"
        height="${photo.height}"
        alt="${photo.alt}"
        class="obsessions__img"
        loading="lazy"
      />
      <figcaption class="obsessions__caption">${photo.caption}</figcaption>
    </figure>
  `
}

const obsessionsList = document.getElementById('obsessionsList')

if (obsessionsList) {
  obsessionsList.innerHTML = OBSESSIONS.map(obsessionCardHTML).join('')

  const revealEls = obsessionsList.querySelectorAll('.obsessions__reveal')
  initScrollReveal(revealEls, 'obsessions__reveal--visible')
}
