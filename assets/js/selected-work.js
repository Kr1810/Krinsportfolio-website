// Single source of truth for the "Selected work" projects section.
// Add/edit a project here — markup is generated, never duplicated by hand.
const SELECTED_WORK = [
  {
    number: '01',
    file: 'restro.fig',
    title: 'Restro',
    subtitle: 'Restaurant ordering experience',
    description:
      'A mobile menu experience focused on clear navigation and an easy, visually appealing ordering journey.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'UI Design · Mobile UX',
    image: './images/Restro-menu.png',
    imageWidth: 1440,
    imageHeight: 1024,
    alt: 'Restro restaurant menu mobile UI screens',
    href: './project-1.html',
  },
  {
    number: '02',
    file: 'login-flow.fig',
    title: 'Sign up & Login Flow',
    subtitle: 'Authentication & onboarding',
    description:
      'A sample sign-up and login flow designed for a user-friendly, efficient mobile onboarding experience.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'UX Flow · Wireframes · UI Design',
    image: './images/Login.png',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'Sign up and login flow mobile UI screens',
    href: './project-2.html',
  },
  {
    number: '03',
    file: 'zara-wireframe.fig',
    title: 'E-Commerce Wireframe',
    subtitle: 'Clothing app redesign · ZARA',
    description:
      'A wireframe redesign of the ZARA app aimed at making browsing and shopping more intuitive and user-friendly.',
    role: 'UX Designer',
    tools: 'Figma',
    focus: 'UX Research · Wireframes',
    image: './images/Wireframe.png',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'ZARA e-commerce app wireframe screens',
    href: './project-3.html',
  },
  {
    number: '04',
    file: 'email-template.ai',
    title: 'E-mail Template',
    subtitle: 'Marketing email design',
    description:
      'A professional, engaging email template designed for marketing communications.',
    role: 'Graphic Designer',
    tools: 'Illustrator',
    focus: 'Visual Design · Layout',
    image: './images/E-Mail Template.png',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'Marketing email template design',
    href: './project-4.html',
  },
]

function selectedWorkItemHTML(project, index) {
  const parity = index % 2 === 0 ? 'odd' : 'even'
  return `
    <article class="selected-work__item selected-work__item--${parity}">
      <a
        class="selected-work__window"
        href="${project.href}"
        target="_blank"
        rel="noreferrer"
        aria-label="Open ${project.title} case study"
      >
        <span class="selected-work__window-bar">
          <span class="selected-work__window-dots" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
          <span class="selected-work__window-filename">${project.file}</span>
        </span>
        <span class="selected-work__window-preview">
          <img
            class="selected-work__window-img"
            src="${project.image}"
            width="${project.imageWidth}"
            height="${project.imageHeight}"
            alt="${project.alt}"
            loading="lazy"
          />
        </span>
      </a>
      <div class="selected-work__meta">
        <span class="selected-work__number" aria-hidden="true">${project.number}</span>
        <h3 class="selected-work__title">${project.title}</h3>
        <p class="selected-work__subtitle">${project.subtitle}</p>
        <p class="selected-work__desc">${project.description}</p>
        <dl class="selected-work__facts">
          <div class="selected-work__fact">
            <dt>Role</dt>
            <dd>${project.role}</dd>
          </div>
          <div class="selected-work__fact">
            <dt>Tools</dt>
            <dd>${project.tools}</dd>
          </div>
          <div class="selected-work__fact">
            <dt>Focus</dt>
            <dd>${project.focus}</dd>
          </div>
        </dl>
        <a class="selected-work__cta" href="${project.href}" target="_blank" rel="noreferrer">
          View case study <span class="selected-work__cta-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  `
}

const selectedWorkList = document.getElementById('selectedWorkList')

if (selectedWorkList) {
  selectedWorkList.innerHTML = SELECTED_WORK.map(selectedWorkItemHTML).join('')

  const items = selectedWorkList.querySelectorAll('.selected-work__item')
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('selected-work__item--visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    )
    items.forEach((item) => revealObserver.observe(item))
  } else {
    items.forEach((item) => item.classList.add('selected-work__item--visible'))
  }
}
