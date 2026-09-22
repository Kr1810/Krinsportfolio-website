// Desktop-only playful micro-interaction. Progressive enhancement: tags
// stay in their normal in-flow list by default (see sass/pages/_home.scss)
// so nothing breaks without JS, on touch devices, tab-port, or under
// prefers-reduced-motion.
//
// Once this script confirms a real mouse is present, it:
//  1. Anchors each tag near a specific letter in the heading text (matched
//     via data-anchor spans), floating above the "Krina Suthar" line or
//     below the "UI/UX & Graphic Designer" line — offset enough that pills
//     never sit on top of the bold heading text.
//  2. Starts every tag hidden, then reveals them one at a time — in random
//     order — as the cursor moves anywhere in the hero section. Once a tag
//     is revealed it stays put for good; there's no reset/repeat once all
//     six have appeared.
;(function () {
  const hero = document.querySelector('.home-hero')
  const top = document.querySelector('.home-hero__top')
  const tagList = document.querySelector('.home-hero__tags')
  if (!hero || !top || !tagList) return

  const isDesktopHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isDesktopHover || prefersReducedMotion) return

  const tags = Array.from(tagList.querySelectorAll('.home-hero__tag'))
  if (!tags.length) return

  // tags[0] -> anchor "1" (near "K" in Krina), tags[1] -> anchor "2"
  // (near "S" in Suthar), and so on through anchor "6". Anchors 1-3 sit on
  // the name line, so those tags float above it; anchors 4-6 sit on the
  // role line, so those float below it.
  const anchors = tags.map((_, i) =>
    document.querySelector('.home-hero__anchor[data-anchor="' + (i + 1) + '"]')
  )
  const nameEl = document.querySelector('.home-hero__name')
  const roleEl = document.querySelector('.home-hero__role')
  const CLEARANCE = 18 // px gap kept beyond the rotated pill's own footprint
  // A small deliberate overlap (in addition to the exact geometric touch
  // point computed below) so pills visibly meet rather than just kiss at a
  // single point.
  const TOUCH_BIAS = 4

  tagList.classList.add('home-hero__tags--interactive')

  function isPinnedLayout() {
    return window.matchMedia('(min-width: 56.26em)').matches // above tab-port
  }

  function rotationOf(tag) {
    return parseFloat(getComputedStyle(tag).getPropertyValue('--tag-rotate')) || 0
  }

  // A rotated pill's bounding box grows in both axes; used only to size the
  // vertical clearance a row needs (how much taller the tallest rotated
  // pill in it gets).
  function rotatedBounds(width, height, degrees) {
    const rad = (Math.abs(degrees) * Math.PI) / 180
    return {
      width: width * Math.cos(rad) + height * Math.sin(rad),
      height: width * Math.sin(rad) + height * Math.cos(rad),
    }
  }

  // These pills are full stadium shapes (border-radius: 999px) — a
  // rectangle with semicircular caps — not sharp-cornered rectangles, so a
  // simple bounding-box overlap doesn't reliably predict where two
  // differently-rotated pills actually meet. Build the true outline as a
  // polygon (centered on the pill, rotated by its own angle), so the exact
  // touch point between any two pills can be computed regardless of how
  // differently they're each tilted.
  function stadiumOutline(width, height, degrees) {
    const hw = width / 2
    const hh = height / 2
    const straight = Math.max(hw - hh, 0)
    const segs = 24
    const pts = []
    for (let i = 0; i <= segs; i++) {
      const a = -Math.PI / 2 + (Math.PI * i) / segs
      pts.push([straight + hh * Math.cos(a), hh * Math.sin(a)])
    }
    pts.push([-straight, hh])
    for (let i = 0; i <= segs; i++) {
      const a = Math.PI / 2 + (Math.PI * i) / segs
      pts.push([-straight + hh * Math.cos(a), hh * Math.sin(a)])
    }
    pts.push([straight, -hh])

    const rad = (degrees * Math.PI) / 180
    const cos = Math.cos(rad)
    const sin = Math.sin(rad)
    return pts.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos])
  }

  // Furthest x on the outline at world y = targetY (found by linearly
  // interpolating each edge segment that crosses that height). Returns
  // null if the shape doesn't reach that height at all.
  function extentAtY(outline, targetY, side) {
    let best = null
    for (let i = 0; i < outline.length; i++) {
      const [x1, y1] = outline[i]
      const [x2, y2] = outline[(i + 1) % outline.length]
      if (y1 === y2) continue
      if ((y1 - targetY) * (y2 - targetY) > 0) continue
      const t = (targetY - y1) / (y2 - y1)
      const x = x1 + t * (x2 - x1)
      best = best === null ? x : side === 'right' ? Math.max(best, x) : Math.min(best, x)
    }
    return best
  }

  // The minimum center-to-center X distance so the left shape and the
  // right shape don't overlap at ANY height — not just at their shared
  // center line. Two differently-rotated pills can come closest near a
  // corner rather than at the mid-height, so every height across both
  // outlines' combined vertical span is checked and the worst case wins.
  function requiredCenterGap(outlineLeft, outlineRight) {
    const allY = outlineLeft.concat(outlineRight).map((p) => p[1])
    const minY = Math.min.apply(null, allY)
    const maxY = Math.max.apply(null, allY)
    const samples = 48
    let maxGap = -Infinity
    for (let i = 0; i <= samples; i++) {
      const y = minY + ((maxY - minY) * i) / samples
      const r = extentAtY(outlineLeft, y, 'right')
      const l = extentAtY(outlineRight, y, 'left')
      if (r === null || l === null) continue
      maxGap = Math.max(maxGap, r - l)
    }
    return maxGap
  }

  function layoutRow(indices, startX, edgeY, direction) {
    let maxExtraHeight = 0
    indices.forEach((i) => {
      const bounds = rotatedBounds(tags[i].offsetWidth, tags[i].offsetHeight, rotationOf(tags[i]))
      maxExtraHeight = Math.max(maxExtraHeight, bounds.height - tags[i].offsetHeight)
    })

    let centerX = null
    let prevOutline = null
    indices.forEach((i) => {
      const tag = tags[i]
      const w = tag.offsetWidth
      const h = tag.offsetHeight
      const deg = rotationOf(tag)
      const outline = stadiumOutline(w, h, deg)

      if (centerX === null) {
        // First pill in the row: its own left edge starts at `startX`, so
        // its center sits half its rotated bounding width to the right.
        const bounds = rotatedBounds(w, h, deg)
        centerX = startX + bounds.width / 2
      } else {
        centerX += requiredCenterGap(prevOutline, outline) - TOUCH_BIAS
      }

      const topY =
        direction === 'up'
          ? edgeY - maxExtraHeight / 2 - h
          : direction === 'level'
            ? edgeY - h / 2
            : edgeY + maxExtraHeight / 2
      tag.style.setProperty('--tag-x', centerX - w / 2 + 'px')
      tag.style.setProperty('--tag-y', topY + 'px')

      prevOutline = outline
    })
  }

  function positionTags() {
    if (!isPinnedLayout() || !nameEl || !roleEl) return
    const containerRect = top.getBoundingClientRect()
    const nameRect = nameEl.getBoundingClientRect()
    const nameCenterY = (nameRect.top + nameRect.bottom) / 2 - containerRect.top
    const roleBottom = roleEl.getBoundingClientRect().bottom - containerRect.top
    // Row 1 starts at the END of "Krina Suthar" (not "K") so the chain
    // sits level with the name, in the open space to its right, instead
    // of floating above it.
    const rowOneStartX = nameRect.right - containerRect.left
    const fourthAnchorX = anchors[3].getBoundingClientRect().left - containerRect.left

    layoutRow([0, 1, 2], rowOneStartX, nameCenterY, 'level')
    layoutRow([3, 4, 5], fourthAnchorX, roleBottom + CLEARANCE, 'down')
  }

  positionTags()
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionTags)
  }

  let resizeTimer = null
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(positionTags, 150)
  })

  const MIN_GAP_MS = 200
  const MAX_GAP_MS = 380
  const FLASH_MS = 450

  let nextAllowedAt = 0
  let queue = []
  const flashTimers = new WeakMap()

  function shuffle(list) {
    const copy = list.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = copy[i]
      copy[i] = copy[j]
      copy[j] = tmp
    }
    return copy
  }

  const queueOrder = shuffle(tags)

  function revealTag(tag) {
    tag.classList.add('home-hero__tag--revealed', 'home-hero__tag--lit')
    const existing = flashTimers.get(tag)
    if (existing) clearTimeout(existing)
    flashTimers.set(
      tag,
      setTimeout(() => {
        tag.classList.remove('home-hero__tag--lit')
        flashTimers.delete(tag)
      }, FLASH_MS)
    )
  }

  function onMouseMove() {
    if (queueOrder.length === 0) return
    const now = performance.now()
    if (now < nextAllowedAt) return
    nextAllowedAt = now + MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS)
    revealTag(queueOrder.shift())
  }

  hero.addEventListener('mousemove', onMouseMove)
})()
