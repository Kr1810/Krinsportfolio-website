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
      'Competitive Analysis',
      'User Flows',
      'Wireframing',
      'Prototyping',
      'Usability Testing',
      'Accessibility',
      'UX Writing',
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
      'Interaction Design',
      'Visual Design',
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
    id: 'ai-design',
    number: '04',
    title: 'AI-Enabled Design',
    file: 'ai_design.txt',
    skills: [
      'AI-Assisted UI Ideation',
      'Prompt-Driven Web Prototyping',
      'Vibe Coding',
      'AI Design-to-Code Workflows',
      'Rapid UI Iteration',
    ],
  },
  {
    id: 'ai-tools',
    number: '05',
    title: 'AI Tools',
    file: 'ai_tools.txt',
    skills: [
      { name: 'Claude', icon: null },
      { name: 'ChatGPT', icon: './images/skills/GPT.webp' },
      { name: 'GitHub Copilot', icon: null },
      { name: 'Codex', icon: null },
      { name: 'Cursor', icon: null },
      { name: 'Antigravity', icon: null },
      { name: 'Midjourney', icon: null },
      { name: 'Figma AI', icon: './images/skills/figma.webp' },
      { name: 'Figma Agent', icon: null },
      { name: 'Framer AI', icon: null },
      { name: 'Emergent AI', icon: null },
      { name: 'v0', icon: null },
    ],
  },
  {
    id: 'design-tools',
    number: '06',
    title: 'Design & Web Tools',
    file: 'design_tools.txt',
    skills: [
      { name: 'Figma', icon: './images/figma_logo.webp' },
      { name: 'Framer', icon: null },
      { name: 'Webflow', icon: null },
      { name: 'Adobe XD', icon: './images/AdobeXD_Logo.svg' },
      { name: 'Illustrator', icon: './images/skills/Ai.webp' },
      { name: 'After Effects', icon: null },
      { name: 'Adobe Express', icon: null },
      { name: 'Canva', icon: null },
      { name: 'Miro', icon: null },
      { name: 'Blender', icon: null },
    ],
  },
  {
    id: 'dev-tools',
    number: '07',
    title: 'Dev & Collaboration',
    file: 'dev_tools.txt',
    skills: [
      { name: 'VS Code', icon: null },
      { name: 'HTML5', icon: './images/skills/HTML.webp' },
      { name: 'CSS3', icon: './images/skills/css.webp' },
      { name: 'JavaScript', icon: './images/skills/JS.webp' },
      { name: 'React', icon: null },
      { name: 'Git', icon: './images/skills/Github.webp' },
      { name: 'Jira', icon: null },
      { name: 'Linear', icon: null },
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
      class="toolbox__card toolbox__reveal"
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
  initScrollReveal(revealEls, 'toolbox__reveal--visible')
}
