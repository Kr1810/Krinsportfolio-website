// Single source of truth for the "TOOLBOX/" skills section.
// Capabilities first, tools second — no ratings, no percentages.
const TOOLBOX = [
  {
    id: 'ux',
    number: '01',
    title: 'UX Design',
    file: 'ux_design.txt',
    skills: [
      'User Research',
      'User Flows',
      'Information Architecture',
      'Wireframing',
      'Prototyping',
      'Usability Testing',
    ],
  },
  {
    id: 'ui',
    number: '02',
    title: 'UI Design',
    file: 'ui_design.txt',
    skills: [
      'Interface Design',
      'Responsive Design',
      'Design Systems',
      'Component Design',
      'Interaction Design',
      'Visual Hierarchy',
    ],
  },
  {
    id: 'graphic',
    number: '03',
    title: 'Graphic Design',
    file: 'graphic_design.txt',
    skills: [
      'Layout Design',
      'Typography',
      'Social Media Creatives',
      'Marketing Graphics',
      'Branding Basics',
      'Visual Communication',
    ],
  },
  {
    id: 'tools',
    number: '04',
    title: 'Tools',
    file: 'tools.txt',
    skills: [
      { name: 'Figma', icon: './images/figma_logo.png' },
      { name: 'Adobe XD', icon: './images/AdobeXD_Logo.svg' },
      { name: 'Illustrator', icon: './images/skills/Ai.png' },
      { name: 'HTML', icon: null },
      { name: 'CSS', icon: null },
    ],
  },
]

function skillListItemHTML(skill) {
  if (typeof skill === 'string') {
    return `<li class="toolbox__skill">${skill}</li>`
  }
  const icon = skill.icon
    ? `<img src="${skill.icon}" alt="" class="toolbox__skill-icon" aria-hidden="true" />`
    : ''
  return `<li class="toolbox__skill toolbox__skill--tool">${icon}${skill.name}</li>`
}

function toolboxCardHTML(group, index) {
  return `
    <article
      class="toolbox__card toolbox__card--${group.id} toolbox__reveal"
      style="--card-i: ${index}"
    >
      <span class="toolbox__card-bar">
        <span class="toolbox__card-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="toolbox__card-filename">${group.file}</span>
      </span>
      <div class="toolbox__card-body">
        <span class="toolbox__card-number" aria-hidden="true">${group.number}</span>
        <h3 class="toolbox__card-title">${group.title}</h3>
        <ul class="toolbox__skill-list">
          ${group.skills.map(skillListItemHTML).join('')}
        </ul>
      </div>
    </article>
  `
}

const toolboxList = document.getElementById('toolboxList')

if (toolboxList) {
  toolboxList.innerHTML = TOOLBOX.map(toolboxCardHTML).join('')

  const revealEls = document.querySelectorAll('.toolbox .toolbox__reveal')
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('toolbox__reveal--visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    revealEls.forEach((el) => revealObserver.observe(el))
  } else {
    revealEls.forEach((el) => el.classList.add('toolbox__reveal--visible'))
  }
}
