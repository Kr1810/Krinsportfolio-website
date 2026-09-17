// Single source of truth for the "EXPERIENCE/" section.
// Sourced from the real work history in assets/Krina Suthar_RESUMEfnl.pdf.
// Most recent role first.
const EXPERIENCE = [
  {
    id: 'codage-habitation',
    file: 'work_history_02.txt',
    period: 'Jan 2025 — Jul 2025',
    role: 'UI/UX Designer',
    type: 'Internship',
    company: 'Codage Habitation',
    location: 'Ahmedabad · On-site',
    description:
      'A UI/UX design internship spanning web redesigns, app interfaces and creative assets — from e-commerce, B2B, real estate and Web3 sites to dashboards, mobile app UI and social media content, all with user-centered layouts and consistent branding.',
    focus: ['UI/UX Design', 'Responsive Web Design', 'Visual Storytelling', 'Brand Design'],
  },
  {
    id: 'codsoft',
    file: 'work_history_01.txt',
    period: 'Jun 2024 — Jul 2024',
    role: 'UI/UX Designer',
    type: 'Internship',
    company: 'CodSoft',
    location: 'Kolkata · Remote',
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
  initScrollReveal(revealEls, 'experience__reveal--visible')
}
