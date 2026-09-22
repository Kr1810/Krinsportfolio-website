// "OBSESSIONS/" — a personal photography section, shown as a right-to-left
// marquee. Source photos live in images/obsession/ (raw, huge phone-camera
// exports — not web-safe as-is); the files referenced below are optimized
// copies in images/portfolio-assets/obsession/ (resized to a fixed width,
// original aspect ratio preserved, converted to .webp) generated from them.
// width/height here are each file's real intrinsic size so the browser can
// reserve layout space before it loads, same as every other image on this
// site.
const OBSESSIONS = [
  { id: '01', width: 700, height: 1553 },
  { id: '02', width: 700, height: 1410 },
  { id: '03', width: 700, height: 809 },
  { id: '04', width: 700, height: 933 },
  { id: '05', width: 700, height: 1243 },
  { id: '06', width: 700, height: 933 },
  { id: '07', width: 700, height: 1244 },
  { id: '08', width: 700, height: 525 },
  { id: '09', width: 700, height: 933 },
  { id: '10', width: 700, height: 933 },
  { id: '11', width: 700, height: 1245 },
  { id: '12', width: 700, height: 1245 },
  { id: '13', width: 700, height: 700 },
  { id: '14', width: 700, height: 933 },
  { id: '15', width: 700, height: 700 },
  { id: '16', width: 700, height: 1216 },
  { id: '17', width: 700, height: 1245 },
  { id: '18', width: 700, height: 1556 },
  { id: '19', width: 700, height: 1244 },
  { id: '20', width: 700, height: 933 },
  { id: '21', width: 700, height: 1244 },
  { id: '22', width: 700, height: 1245 },
  { id: '23', width: 700, height: 1245 },
  { id: '24', width: 700, height: 1427 },
  { id: '25', width: 700, height: 1244 },
  { id: '26', width: 700, height: 933 },
  { id: '27', width: 700, height: 958 },
  { id: '28', width: 700, height: 933 },
  { id: '29', width: 700, height: 1253 },
].map((photo, index) => ({
  ...photo,
  src: `./images/portfolio-assets/obsession/${photo.id}.webp`,
  alt: `Personal photo ${index + 1} of 29 from Krina's obsessions`,
}))

function obsessionImgHTML(photo) {
  return `
    <img
      src="${photo.src}"
      width="${photo.width}"
      height="${photo.height}"
      alt="${photo.alt}"
      class="obsessions__img"
      loading="lazy"
    />
  `
}

const obsessionsList = document.getElementById('obsessionsList')

if (obsessionsList) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const track = OBSESSIONS.map(obsessionImgHTML).join('')
  // Duplicate the strip once so the marquee can loop seamlessly: animating
  // the track exactly -50% moves it by one full set's width, at which
  // point the (identical) second copy sits exactly where the first began.
  const trackCount = prefersReducedMotion ? 1 : 2

  obsessionsList.innerHTML = `
    <div class="obsessions__marquee">
      <div class="obsessions__track">
        ${track.repeat(trackCount)}
      </div>
    </div>
  `
}
