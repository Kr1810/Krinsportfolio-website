// Welcome card — surfaces the About section's "QUICK_INFO/" facts (plus
// email) as a dismissible modal shown on every page load/refresh, so a
// visitor gets the at-a-glance summary before they've scrolled anywhere.
// No "seen it" flag in storage — by design, it's meant to reappear each visit.
;(function () {
  const card = document.getElementById('welcomeCard')
  if (!card) return

  const panel = card.querySelector('.welcome-card__panel')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let lastFocusedTrigger = null

  function getFocusable() {
    return Array.from(panel.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]'))
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeCard()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = getFocusable()
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function openCard() {
    lastFocusedTrigger = document.activeElement
    card.hidden = false
    document.documentElement.classList.add('has-modal-open')

    requestAnimationFrame(() => {
      card.classList.add('welcome-card--open')
    })

    panel.focus()
    document.addEventListener('keydown', onKeydown)
  }

  function closeCard() {
    card.classList.remove('welcome-card--open')
    document.documentElement.classList.remove('has-modal-open')
    document.removeEventListener('keydown', onKeydown)

    const finish = () => {
      card.hidden = true
    }

    if (prefersReducedMotion) {
      finish()
    } else {
      card.addEventListener('transitionend', finish, { once: true })
    }

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus()
    }
  }

  card.addEventListener('click', (event) => {
    if (event.target.closest('[data-welcome-dismiss]')) {
      closeCard()
    }
  })

  openCard()
})()
