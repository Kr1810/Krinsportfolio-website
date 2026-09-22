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
  // Pills touch edge-to-edge along each row; a small negative overlap
  // makes their rotated corners actually meet instead of leaving a hairline
  // gap (adjacent pills tilt in different directions, so corners — not
  // flat edges — are what end up meeting).
  const TOUCH_OVERLAP = 10

  tagList.classList.add('home-hero__tags--interactive')

  function isPinnedLayout() {
    return window.matchMedia('(min-width: 56.26em)').matches // above tab-port
  }

  // A rotated pill's bounding box grows in both axes; used so each pill in
  // a chained row starts right where the previous one's rotated footprint
  // ends, and so a row's shared Y clears the tallest rotated pill in it.
  function rotatedBounds(width, height, degrees) {
    const rad = (Math.abs(degrees) * Math.PI) / 180
    return {
      width: width * Math.cos(rad) + height * Math.sin(rad),
      height: width * Math.sin(rad) + height * Math.cos(rad),
    }
  }

  function rotationOf(tag) {
    return parseFloat(getComputedStyle(tag).getPropertyValue('--tag-rotate')) || 0
  }

  function layoutRow(indices, startX, edgeY, direction) {
    let cursorX = startX
    let maxExtraHeight = 0
    indices.forEach((i) => {
      const bounds = rotatedBounds(tags[i].offsetWidth, tags[i].offsetHeight, rotationOf(tags[i]))
      maxExtraHeight = Math.max(maxExtraHeight, bounds.height - tags[i].offsetHeight)
    })

    indices.forEach((i) => {
      const tag = tags[i]
      const bounds = rotatedBounds(tag.offsetWidth, tag.offsetHeight, rotationOf(tag))
      const y = direction === 'up' ? edgeY - maxExtraHeight / 2 - tag.offsetHeight : edgeY + maxExtraHeight / 2
      tag.style.setProperty('--tag-x', cursorX + 'px')
      tag.style.setProperty('--tag-y', y + 'px')
      cursorX += bounds.width - TOUCH_OVERLAP
    })
  }

  function positionTags() {
    if (!isPinnedLayout() || !nameEl || !roleEl) return
    const containerRect = top.getBoundingClientRect()
    const nameTop = nameEl.getBoundingClientRect().top - containerRect.top
    const roleBottom = roleEl.getBoundingClientRect().bottom - containerRect.top
    const firstAnchorX = anchors[0].getBoundingClientRect().left - containerRect.left
    const fourthAnchorX = anchors[3].getBoundingClientRect().left - containerRect.left

    // Top-group tags must never float up behind the fixed header — a hard
    // floor takes priority over clearing the (small, secondary) kicker
    // label, since the header is structural and the kicker isn't.
    const headerEl = document.querySelector('.header')
    const headerBottom = headerEl
      ? headerEl.getBoundingClientRect().bottom - containerRect.top + 12
      : -Infinity

    layoutRow([0, 1, 2], firstAnchorX, Math.max(nameTop - CLEARANCE, headerBottom), 'up')
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
