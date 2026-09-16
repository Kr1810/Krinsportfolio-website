// Contact section: scroll-reveal (same pattern as other sections) + copy-to-clipboard.
// Contact details (email, links, resume) live only in index.html's markup — this
// script reads the email from the DOM rather than holding a second copy of it.
const contactFile = document.querySelector('.contact-file')

if (contactFile) {
  const revealEls = contactFile.querySelectorAll('.contact-file__reveal')
  initScrollReveal(revealEls, 'contact-file__reveal--visible')

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
