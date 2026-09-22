// "OBSESSIONS/" — a scattered grid-collage of personal photos and headline
// fragments, styled after a shared mood-board reference (square grid-line
// lattice, images and bold text dropped into the grid at varying spans).
// Source photos live in images/obsession/ (raw, huge phone-camera exports —
// not web-safe as-is); the files referenced below are optimized copies in
// images/portfolio-assets/obsession/ (resized to a fixed width, original
// aspect ratio preserved, converted to .webp) generated from them. Each
// photo's span (1x1, 1x2 or 2x1 grid cells) is chosen from its own real
// aspect ratio, so tall portraits get tall cells and the rare landscape
// shot gets a wide one — content keeps its own proportions rather than
// being forced into a uniform tile.
const OBSESSIONS = [
  { id: '01', width: 700, height: 1553 },
  { id: '02', width: 700, height: 1410 },
  { id: '03', width: 700, height: 809 },
  { id: '04', width: 700, height: 933 },
  { id: '05', width: 700, height: 1243 },
  { id: '06', width: 700, height: 933 },
  { id: '08', width: 700, height: 525 },
  { id: '09', width: 700, height: 933 },
  { id: '10', width: 700, height: 933 },
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
]
OBSESSIONS.forEach((photo, index) => {
  photo.src = `./images/portfolio-assets/obsession/${photo.id}.webp`
  photo.alt = `Personal photo ${index + 1} of ${OBSESSIONS.length} from Krina's obsessions`
  const ratio = photo.width / photo.height
  if (ratio >= 1.15) {
    photo.colSpan = 2
    photo.rowSpan = 1
  } else if (ratio <= 0.6) {
    photo.colSpan = 1
    photo.rowSpan = 2
  } else {
    photo.colSpan = 1
    photo.rowSpan = 1
  }
})

// The existing section copy (eyebrow/heading/lede), broken into pieces and
// dropped into the grid as bold text tiles instead of a paragraph block
// above it — mirrors how the reference layout interlaces its headline
// fragments between images.
const OBSESSIONS_TEXT = [
  { type: 'text', text: "Things I can't stop", variant: 'heading', colSpan: 3, rowSpan: 2 },
  { type: 'text', text: 'pointing a camera at.', variant: 'accent', colSpan: 3, rowSpan: 1 },
  {
    type: 'text',
    text:
      "A running, unofficial archive of moments and places I got a little too attached to. More gets pinned up here over time.",
    variant: 'lede',
    colSpan: 4,
    rowSpan: 2,
  },
]

const GRID_COLS_DESKTOP = 9
const GRID_COLS_NARROW = 4

// A handful of invisible 1x1 spacer slots, seeded through the packing
// order below, so the grid keeps the reference's sparse/breathing feel
// instead of packing every cell edge to edge.
const SPACERS = new Array(11).fill(null).map(() => ({ type: 'spacer', colSpan: 1, rowSpan: 1 }))

function buildPackingOrder() {
  const images = OBSESSIONS.map((photo) => ({ type: 'image', photo, colSpan: photo.colSpan, rowSpan: photo.rowSpan }))
  const order = [
    OBSESSIONS_TEXT[0],
    images[0],
    images[1],
    SPACERS[0],
    images[2],
    OBSESSIONS_TEXT[1],
    images[3],
    images[4],
    SPACERS[1],
    images[5],
    images[6],
    images[7],
    SPACERS[2],
    OBSESSIONS_TEXT[2],
    images[8],
    images[9],
    SPACERS[3],
    images[10],
    images[11],
    images[12],
    SPACERS[4],
    images[13],
    images[14],
    SPACERS[5],
    images[15],
    images[16],
    images[17],
    SPACERS[6],
    images[18],
    images[19],
    SPACERS[7],
    images[20],
    images[21],
    images[22],
    SPACERS[8],
    images[23],
    images[24],
    SPACERS[9],
    images[25],
    images[26] || null,
    SPACERS[10],
  ].filter(Boolean)
  return order
}

// Simple skyline/shelf packer: for each item, find the column window
// (of its own colSpan width) with the lowest current stack height, place
// it there, and raise that window's height by the item's rowSpan. Grid
// row/column numbers are 1-indexed, matching CSS Grid's own convention.
function packGrid(items, cols) {
  const heights = new Array(cols).fill(0)
  return items.map((item) => {
    const span = Math.min(item.colSpan, cols)
    let bestCol = 0
    let bestHeight = Infinity
    for (let c = 0; c <= cols - span; c++) {
      const windowMax = Math.max(...heights.slice(c, c + span))
      if (windowMax < bestHeight) {
        bestHeight = windowMax
        bestCol = c
      }
    }
    const rowStart = bestHeight + 1
    for (let c = bestCol; c < bestCol + span; c++) {
      heights[c] = bestHeight + item.rowSpan
    }
    // Store the clamped span (never wider than the grid itself) so a tile
    // like the lede, sized for the 9-column desktop layout, doesn't spill
    // into a nonexistent column on a narrower packing.
    return { ...item, colSpan: span, colStart: bestCol + 1, rowStart, rowEnd: rowStart + item.rowSpan }
  })
}

function tileStyle(item) {
  return `grid-column: ${item.colStart} / span ${item.colSpan}; grid-row: ${item.rowStart} / span ${item.rowSpan};`
}

function imageTileHTML(item, imageIndex) {
  const { photo } = item
  return `
    <figure
      class="obsessions__tile obsessions__tile--image obsessions__reveal"
      style="${tileStyle(item)} --card-i: ${imageIndex};"
    >
      <img src="${photo.src}" width="${photo.width}" height="${photo.height}" alt="${photo.alt}" loading="lazy" />
    </figure>
  `
}

function textTileHTML(item) {
  return `
    <p class="obsessions__tile obsessions__tile--text obsessions__tile--${item.variant}" style="${tileStyle(item)}">
      ${item.text}
    </p>
  `
}

function spacerTileHTML(item) {
  return `<span class="obsessions__tile obsessions__tile--spacer" style="${tileStyle(item)}" aria-hidden="true"></span>`
}

// Images reveal one at a time while scrolling in (text/spacer tiles render
// immediately) — imageIndex only increments for image tiles, so each
// grid's own photos stagger in their own packing order regardless of
// where a text block or spacer falls between them.
function tileHTML(item, imageIndex) {
  if (item.type === 'image') return imageTileHTML(item, imageIndex)
  if (item.type === 'text') return textTileHTML(item)
  return spacerTileHTML(item)
}

function gridHTML(items, cols, modifier, cellVar) {
  const packed = packGrid(items, cols)
  const totalRows = Math.max(...packed.map((item) => item.rowEnd - 1))
  let imageIndex = 0
  const tiles = packed
    .map((item) => {
      const html = tileHTML(item, imageIndex)
      if (item.type === 'image') imageIndex += 1
      return html
    })
    .join('')

  return `
    <div
      class="obsessions__grid obsessions__grid--${modifier}"
      style="grid-template-columns: repeat(${cols}, var(${cellVar})); grid-template-rows: repeat(${totalRows}, var(${cellVar}));"
    >
      ${tiles}
      <span class="obsessions__grid-label">OBSESSIONS/</span>
    </div>
  `
}

const obsessionsList = document.getElementById('obsessionsList')

if (obsessionsList) {
  const order = buildPackingOrder()
  // Two independent packings of the same content: a wide mosaic for
  // desktop, and a narrower, taller one for mobile/tablet — swapped in by
  // CSS media query (see _obsessions.scss) rather than recomputed on
  // resize, so the layout reads as a genuinely vertical stack on small
  // screens instead of a shrunk-down copy of the wide grid.
  obsessionsList.innerHTML =
    gridHTML(order, GRID_COLS_DESKTOP, 'desktop', '--obsessions-cell') +
    gridHTML(order, GRID_COLS_NARROW, 'narrow', '--obsessions-cell-narrow')

  // Whichever grid variant is actually visible at the current breakpoint
  // gets observed and revealed; the hidden variant's tiles have no layout
  // box, so they simply never intersect and never fire.
  const imageEls = obsessionsList.querySelectorAll('.obsessions__reveal')
  initScrollReveal(imageEls, 'obsessions__reveal--visible', { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
}
