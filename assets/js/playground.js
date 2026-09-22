// "PLAYGROUND/" — the fun, heavily-animated section. A curated subset of the
// AI stack (the full list lives in the Toolbox), rendered as flip cards with
// three signature interactions: cursor-follow glow, tilt-to-straighten on
// hover, and click/keyboard flip + a small on-brand confetti burst.
// Every interaction is skipped or made instant under prefers-reduced-motion.
const AI_STACK = [
  { id: 'cursor', name: 'Cursor', tag: 'Design → Code', blurb: "Turns my Figma frames into real code, so devs stop side-eyeing my ‘quick mockup’." },
  { id: 'figma-ai', name: 'Figma AI', tag: 'Ideation', blurb: 'First-draft variations while I still have my coffee in hand.' },
  { id: 'claude', name: 'Claude', tag: 'Thinking Partner', blurb: 'The rubber duck that actually talks back — and writes decent copy too.' },
  { id: 'chatgpt', name: 'ChatGPT', tag: 'Untangling Briefs', blurb: 'My go-to for untangling a brief before I even open Figma.' },
  { id: 'v0', name: 'v0', tag: 'Prompt → UI', blurb: 'Prompt in, working UI out. Feels like cheating. It is not.' },
  { id: 'midjourney', name: 'Midjourney', tag: 'Moodboards', blurb: 'Moodboards in minutes, not a three-hour Pinterest spiral.' },
  { id: 'framer-ai', name: 'Framer AI', tag: 'Sites, Fast', blurb: 'Ships a real, live site before the meeting even ends.' },
  { id: 'canva', name: 'Canva', tag: 'Quick Assets', blurb: 'For when a social post needs to exist in the next ten minutes.' },
  { id: 'blender', name: 'Blender', tag: '3D Sketching', blurb: 'Where flat screens get a little depth — literally.' },
  { id: 'after-effects', name: 'After Effects', tag: 'Motion Polish', blurb: 'The last 10% that makes a static screen feel alive.' },
]

const CONFETTI_COLORS = ['#284b63', '#3c6e71', '#d9d9d9', '#ffffff']

function playgroundCardHTML(tool, index) {
  return `
    <li class="playground__item">
      <button
        type="button"
        class="playground__card"
        style="--i: ${index}"
        data-flip-card
        aria-label="${tool.name}, ${tool.tag}. Press to reveal a note."
      >
        <span class="playground__card-inner">
          <span class="playground__card-face playground__card-face--front">
            <span class="playground__card-name">${tool.name}</span>
            <span class="playground__card-tag">${tool.tag}</span>
          </span>
          <span class="playground__card-face playground__card-face--back">
            <span class="playground__card-blurb">${tool.blurb}</span>
          </span>
        </span>
      </button>
    </li>
  `
}

const playgroundList = document.getElementById('playgroundList')
const playgroundSection = document.getElementById('playground')

if (playgroundList && playgroundSection) {
  playgroundList.innerHTML = AI_STACK.map(playgroundCardHTML).join('')

  const cards = playgroundList.querySelectorAll('.playground__item')
  initScrollReveal(cards, 'playground__item--visible')

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // --- Interaction 1: click/keyboard flip + confetti burst ---
  function spawnConfetti(originEl) {
    if (prefersReducedMotion) return
    const rect = originEl.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2

    for (let i = 0; i < 9; i++) {
      const piece = document.createElement('span')
      piece.className = 'playground__confetti'
      const angle = (Math.PI * 2 * i) / 9 + Math.random() * 0.5
      const distance = 60 + Math.random() * 50
      piece.style.setProperty('--tx', `${Math.cos(angle) * distance}px`)
      piece.style.setProperty('--ty', `${Math.sin(angle) * distance}px`)
      piece.style.setProperty('--rot', `${Math.random() * 360}deg`)
      piece.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
      piece.style.left = `${originX}px`
      piece.style.top = `${originY}px`
      document.body.appendChild(piece)
      piece.addEventListener('animationend', () => piece.remove(), { once: true })
    }
  }

  playgroundList.addEventListener('click', (event) => {
    const card = event.target.closest('[data-flip-card]')
    if (!card) return
    const wasFlipped = card.classList.contains('playground__card--flipped')
    card.classList.toggle('playground__card--flipped')
    if (!wasFlipped) spawnConfetti(card)
  })

  // --- Interaction 2: cursor-follow glow, only while section is visible ---
  const glow = document.createElement('span')
  glow.className = 'playground__glow'
  glow.setAttribute('aria-hidden', 'true')
  playgroundSection.appendChild(glow)

  let glowActive = false
  let rafId = null
  let pendingX = 0
  let pendingY = 0

  function updateGlow() {
    glow.style.transform = `translate(${pendingX}px, ${pendingY}px)`
    rafId = null
  }

  function onPointerMove(event) {
    const rect = playgroundSection.getBoundingClientRect()
    pendingX = event.clientX - rect.left
    pendingY = event.clientY - rect.top
    if (rafId === null) rafId = requestAnimationFrame(updateGlow)
  }

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const glowObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !glowActive) {
            glowActive = true
            glow.classList.add('playground__glow--active')
            playgroundSection.addEventListener('pointermove', onPointerMove)
          } else if (!entry.isIntersecting && glowActive) {
            glowActive = false
            glow.classList.remove('playground__glow--active')
            playgroundSection.removeEventListener('pointermove', onPointerMove)
          }
        })
      },
      { threshold: 0.1 }
    )
    glowObserver.observe(playgroundSection)
  }
}
