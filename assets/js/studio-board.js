// Scroll-reveal + drag-to-scroll for the Studio board section.
// Uses the shared reveal utility in assets/js/reveal.js.
const studioBoard = document.querySelector('.studio-board')

if (studioBoard) {
  const revealEls = studioBoard.querySelectorAll('.studio-board__reveal')
  initScrollReveal(revealEls, 'studio-board__reveal--visible')

  const scroller = studioBoard.querySelector('.studio-board__scroller')
  if (scroller) {
    initStudioScroller(scroller)
  }
}

function initStudioScroller(scroller) {
  let pointerId = null
  let startY = 0
  let startScroll = 0
  let dragging = false

  scroller.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return
    if (event.button !== 0) return

    pointerId = event.pointerId
    startY = event.clientY
    startScroll = scroller.scrollTop
    dragging = false
    scroller.setPointerCapture(pointerId)
  })

  scroller.addEventListener('pointermove', (event) => {
    if (pointerId !== event.pointerId) return

    const delta = event.clientY - startY
    if (!dragging && Math.abs(delta) > 6) {
      dragging = true
      scroller.classList.add('is-dragging')
    }
    if (dragging) {
      scroller.scrollTop = startScroll - delta
    }
  })

  const endDrag = (event) => {
    if (pointerId !== event.pointerId) return
    pointerId = null
    scroller.classList.remove('is-dragging')
    if (dragging) {
      scroller.dataset.suppressClick = 'true'
    }
    dragging = false
  }

  scroller.addEventListener('pointerup', endDrag)
  scroller.addEventListener('pointercancel', endDrag)

  scroller.addEventListener(
    'click',
    (event) => {
      if (scroller.dataset.suppressClick !== 'true') return
      delete scroller.dataset.suppressClick
      event.preventDefault()
      event.stopPropagation()
    },
    true
  )

  scroller.addEventListener('keydown', (event) => {
    const step = Math.round(scroller.clientHeight * 0.55)
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      scroller.scrollBy({ top: step, behavior: 'smooth' })
    }
    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      scroller.scrollBy({ top: -step, behavior: 'smooth' })
    }
    if (event.key === 'Home') {
      event.preventDefault()
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (event.key === 'End') {
      event.preventDefault()
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' })
    }
  })
}
