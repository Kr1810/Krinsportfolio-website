// Single source of truth for the "EXPERIENCE/" section.
// Sourced from the current resume. Most recent role first.
const EXPERIENCE = [
  {
    id: 'techlusion',
    file: 'work_history_02.txt',
    period: 'Dec 2025 — Aug 2026',
    role: 'UI/UX & Graphic Designer',
    type: 'Full-time',
    company: 'Techlusion',
    location: 'Ahmedabad · On-site',
    bullets: [
      'Designed responsive web and mobile interfaces, dashboards and web platforms in Figma for client and internal projects, backed by user research and competitive analysis.',
      'Refined websites and launched them live in production using AI tools (Framer AI, Emergent AI, Webflow), making designs more interactive and impactful for users; used Figma AI for early concept and content variations.',
      'Prototyped design-to-code with Cursor, generating and refining HTML, CSS and React interfaces from Figma concepts to bridge design and development.',
      'Built responsive website prototypes in Webflow, working with layouts, interactions and CMS.',
      'Ran usability testing and gathered stakeholder feedback to drive iterative improvements; partnered with developers to turn requirements into consistent interfaces.',
      'Managed social media platforms and produced social media assets — videos, posts and blog articles — plus branding assets, using Figma, Blender, After Effects, Adobe Express and Canva.',
    ],
    focus: [
      'AI-Assisted Design',
      'Design-to-Code Prototyping',
      'Webflow & CMS',
      'Social Media & Branding',
    ],
  },
  {
    id: 'codage-habitation',
    file: 'work_history_01.txt',
    period: 'Jan 2025 — Jul 2025',
    role: 'UI/UX Designer',
    type: 'Internship',
    company: 'Codage Habitation Pvt. Ltd.',
    location: 'Ahmedabad · On-site',
    bullets: [
      'Designed responsive web and mobile interfaces in Figma, Adobe XD and Canva for live client and internal projects.',
      'Applied wireframing, prototyping, usability testing and visual design across web, mobile, eCommerce, B2B, real-estate and Web3 projects.',
      'Contributed to product redesigns and branding work based on project requirements and feedback.',
    ],
    focus: ['UI/UX Design', 'Usability Testing', 'Visual Design', 'Branding'],
  },
]

function focusTagHTML(tag) {
  return `<li class="experience__tag">${tag}</li>`
}

function bulletHTML(bullet) {
  return `<li class="experience__desc-item">${bullet}</li>`
}

function experienceCardHTML(item, index) {
  return `
    <article class="experience__card experience__reveal" style="--card-i: ${index}">
      <h3 class="experience__role">${item.role} <span class="experience__type">· ${item.type}</span></h3>
      <span class="experience__company">${item.company} · ${item.location}</span>
      <ul class="experience__desc">
        ${item.bullets.map(bulletHTML).join('')}
      </ul>
      <ul class="experience__tags">
        ${item.focus.map(focusTagHTML).join('')}
      </ul>
    </article>
  `
}

// Vertical zigzag timeline: newest role (index 0) on the right, next one on
// the left, and so on — each row is a 3-way slot [left | marker | right]
// with the card in one slot and a truly empty div in the other, so the
// empty slot can be hidden with a plain :empty selector on small screens.
function timelineRowHTML(item, index) {
  const onRight = index % 2 === 0
  const card = experienceCardHTML(item, index)
  return `
    <div class="experience__timeline-row">
      <div class="experience__timeline-slot experience__timeline-slot--left">${onRight ? '' : card}</div>
      <div class="experience__timeline-marker">
        <span class="experience__timeline-period">${item.period}</span>
      </div>
      <div class="experience__timeline-slot experience__timeline-slot--right">${onRight ? card : ''}</div>
    </div>
  `
}

const experienceList = document.getElementById('experienceList')

if (experienceList) {
  experienceList.innerHTML = EXPERIENCE.map(timelineRowHTML).join('')

  const revealEls = document.querySelectorAll('.experience .experience__reveal')
  initScrollReveal(revealEls, 'experience__reveal--visible')
}
