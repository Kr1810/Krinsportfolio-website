// Single source of truth for the "EXPERIENCE/" section.
// Sourced from the real work history in assets/Krina Suthar_RESUMEfnl.pdf —
// only one role exists there, so only one entry is listed here.
const EXPERIENCE = [
  {
    id: 'codsoft',
    file: 'work_history_01.txt',
    period: 'Jun 2024 — Jul 2024',
    role: 'UI/UX Designer',
    type: 'Internship',
    company: 'CodSoft',
    location: 'Kolkata',
    description:
      'A hands-on internship focused on core UI/UX practice — exploring wireframes, prototypes and interface design as part of real project work.',
    focus: ['UI Design', 'Wireframing', 'Prototyping'],
  },
]

function focusTagHTML(tag) {
  return `<li class="experience__tag">${tag}</li>`
}

function experienceCardHTML(item, index) {
  return `
    <article class="experience__card experience__reveal" style="--card-i: ${index}">
      <span class="experience__card-bar">
        <span class="experience__card-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="experience__card-filename">${item.file}</span>
      </span>
      <div class="experience__card-body">
        <span class="experience__period">${item.period}</span>
        <h3 class="experience__role">${item.role} <span class="experience__type">· ${item.type}</span></h3>
        <p class="experience__company">${item.company} · ${item.location}</p>
        <p class="experience__desc">${item.description}</p>
        <ul class="experience__tags">
          ${item.focus.map(focusTagHTML).join('')}
        </ul>
      </div>
    </article>
  `
}

function indexRowHTML(item) {
  return `<li class="experience__index-row"><span>${item.period}</span>${item.company} — ${item.role}</li>`
}

const experienceList = document.getElementById('experienceList')
const experienceIndex = document.getElementById('experienceIndex')

if (experienceList) {
  experienceList.innerHTML = EXPERIENCE.map(experienceCardHTML).join('')

  if (experienceIndex) {
    experienceIndex.innerHTML = EXPERIENCE.map(indexRowHTML).join('')
  }

  const revealEls = document.querySelectorAll('.experience .experience__reveal')
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('experience__reveal--visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    revealEls.forEach((el) => revealObserver.observe(el))
  } else {
    revealEls.forEach((el) => el.classList.add('experience__reveal--visible'))
  }
}
