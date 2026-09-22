// Single source of truth for the "TOOLBOX/" skills section.
// Capabilities first, tools second — no self-rated skill levels or made-up
// proficiency percentages. The dashboard renderer below does size one bar
// per tool group, but that bar reflects an objective count (how many tools
// are in the group), never a subjective rating.
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

// Renders TOOLBOX as a dark "dev dashboard" window (commit log / pipeline /
// metrics panels), matching the shared reference layout. Every group above
// still shows up in full — nothing is summarized away, just reformatted:
// capability groups become log entries, the AI-Enabled Design group becomes
// the workflow/pipeline panel, and the three tool groups become the metrics
// panel — each still listing its actual skills/tools underneath.
const LOG_GROUP_IDS = ['ux', 'ui', 'graphic']
const WORKFLOW_GROUP_ID = 'ai-design'
const METRIC_GROUP_IDS = ['ai-tools', 'design-tools', 'dev-tools']

function skillName(skill) {
  return typeof skill === 'string' ? skill : skill.name
}

function chipHTML(skill) {
  if (typeof skill === 'string') {
    return `<li class="toolbox__chip">${skill}</li>`
  }
  const icon = skill.icon
    ? `<img src="${skill.icon}" alt="" class="toolbox__chip-icon" aria-hidden="true" />`
    : ''
  return `<li class="toolbox__chip toolbox__chip--tool">${icon}${skill.name}</li>`
}

function logEntryHTML(group) {
  return `
    <li class="toolbox__log-entry">
      <div class="toolbox__log-head">
        <span class="toolbox__log-badge" aria-hidden="true">${group.number}</span>
        <div class="toolbox__log-heading">
          <span class="toolbox__log-title">${group.title}</span>
          <span class="toolbox__log-meta">${group.file} · ${group.skills.length} skills</span>
        </div>
      </div>
      <ul class="toolbox__chip-list">${group.skills.map(chipHTML).join('')}</ul>
    </li>
  `
}

function stageHTML(skill, index, total) {
  const isLast = index === total - 1
  return `
    <li class="toolbox__stage${isLast ? ' toolbox__stage--current' : ''}">
      <span class="toolbox__stage-dot" aria-hidden="true"></span>
      ${skill}
    </li>
  `
}

function pipelinePanelHTML(group) {
  return `
    <div class="toolbox__pipeline-head">
      <div>
        <span class="toolbox__pipeline-title">${group.title}</span>
        <span class="toolbox__pipeline-sub">Workflow in daily use</span>
      </div>
      <span class="toolbox__pipeline-status"><i aria-hidden="true"></i>Active</span>
    </div>
    <ul class="toolbox__stage-list">
      ${group.skills.map((s, i) => stageHTML(skillName(s), i, group.skills.length)).join('')}
    </ul>
    <div class="toolbox__snippet" aria-hidden="true">
      <p class="toolbox__snippet-line toolbox__snippet-line--del">- &lt;div class="Frame_2847"&gt;</p>
      <p class="toolbox__snippet-line toolbox__snippet-line--add">+ &lt;section class="hero"&gt;</p>
      <p class="toolbox__snippet-line toolbox__snippet-line--add">+ &nbsp;&nbsp;&lt;h1&gt;Krina Suthar&lt;/h1&gt;</p>
      <p class="toolbox__snippet-line toolbox__snippet-line--add">+ &lt;/section&gt;</p>
    </div>
    <span class="toolbox__pipeline-meta">Figma → Cursor → React</span>
  `
}

function metricRowHTML(group, maxCount) {
  const count = group.skills.length
  const pct = Math.round((count / maxCount) * 100)
  return `
    <li class="toolbox__metric">
      <div class="toolbox__metric-head">
        <span>${group.title}</span>
        <span class="toolbox__metric-value">${count}</span>
      </div>
      <div class="toolbox__metric-bar"><span style="width: ${pct}%"></span></div>
      <ul class="toolbox__chip-list">${group.skills.map(chipHTML).join('')}</ul>
    </li>
  `
}

function dashboardHTML(groups) {
  const byId = (id) => groups.find((g) => g.id === id)
  const logGroups = LOG_GROUP_IDS.map(byId)
  const workflowGroup = byId(WORKFLOW_GROUP_ID)
  const metricGroups = METRIC_GROUP_IDS.map(byId)
  const maxCount = Math.max(...metricGroups.map((g) => g.skills.length))

  return `
    <div class="toolbox__dashboard toolbox__reveal">
      <div class="toolbox__dash-bar">
        <span class="toolbox__dash-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="toolbox__dash-title">krina-suthar / toolbox</span>
        <span class="toolbox__dash-badge"><i aria-hidden="true"></i>Reference</span>
      </div>
      <div class="toolbox__dash-tabs">
        <span class="toolbox__dash-tab"><i aria-hidden="true"></i>capabilities.log</span>
        <span class="toolbox__dash-tab toolbox__dash-tab--active"><i aria-hidden="true"></i>workflow.diff</span>
        <span class="toolbox__dash-tab"><i aria-hidden="true"></i>toolkit.json</span>
      </div>
      <div class="toolbox__dash-body">
        <div class="toolbox__dash-col">
          <span class="toolbox__dash-col-title">CAPABILITIES LOG · what I design with</span>
          <ul class="toolbox__log">${logGroups.map(logEntryHTML).join('')}</ul>
        </div>
        <div class="toolbox__dash-col">
          <span class="toolbox__dash-col-title">DESIGN WORKFLOW</span>
          ${pipelinePanelHTML(workflowGroup)}
        </div>
        <div class="toolbox__dash-col">
          <span class="toolbox__dash-col-title">TOOLKIT STATS · hover for the full list</span>
          <ul class="toolbox__metric-list">
            ${metricGroups.map((g) => metricRowHTML(g, maxCount)).join('')}
          </ul>
        </div>
      </div>
      <div class="toolbox__dash-footer">
        <span>Representative view of my toolbox · Not a live feed</span>
        <span>Krina Suthar — Toolbox</span>
      </div>
    </div>
  `
}

const toolboxList = document.getElementById('toolboxList')

if (toolboxList) {
  toolboxList.innerHTML = dashboardHTML(TOOLBOX)

  const revealEls = document.querySelectorAll('.toolbox .toolbox__reveal')
  initScrollReveal(revealEls, 'toolbox__reveal--visible')
}
