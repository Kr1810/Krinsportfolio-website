// Contact section: scroll-reveal (same pattern as other sections) + copy-to-clipboard.
// Contact details (email, links, resume) live only in index.html's markup — this
// script reads the email from the DOM rather than holding a second copy of it.
const contactFile = document.querySelector('.contact-file')

if (contactFile) {
  const revealEls = contactFile.querySelectorAll('.contact-file__reveal')
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-file__reveal--visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    revealEls.forEach((el) => revealObserver.observe(el))
  } else {
    revealEls.forEach((el) => el.classList.add('contact-file__reveal--visible'))
  }

  const copyBtn = contactFile.querySelector('.contact-file__copy-btn')
  if (copyBtn) {
    const email = copyBtn.dataset.email
    const defaultLabel = copyBtn.textContent.trim()
    let resetTimer

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email)
        copyBtn.textContent = 'Copied ✓'
        copyBtn.classList.add('contact-file__copy-btn--done')
        window.clearTimeout(resetTimer)
        resetTimer = window.setTimeout(() => {
          copyBtn.textContent = defaultLabel
          copyBtn.classList.remove('contact-file__copy-btn--done')
        }, 2000)
      } catch (err) {
        // Clipboard API unavailable — the visible email text and the
        // "Send me an email" mailto link remain the working fallback.
      }
    })
  }
}
