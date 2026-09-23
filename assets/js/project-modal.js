// Case-study modal — reads the shared PROJECTS array (assets/js/selected-work.js,
// must load before this file) and turns any [data-project-id] trigger into an
// in-page case study, instead of navigating to a separate page.
;(function () {
  const modal = document.getElementById('projectModal')
  if (!modal || typeof PROJECTS === 'undefined') return

  const panel = modal.querySelector('.project-modal__panel')
  const body = document.getElementById('projectModalBody')
  const filename = document.getElementById('projectModalFilename')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let lastFocusedTrigger = null

  function processStepHTML(step, index) {
    return `<li><span class="project-modal__step-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>${step}</li>`
  }

  function toolTagHTML(tool) {
    return `<li class="project-modal__tool-tag">${tool}</li>`
  }

  function modalBodyHTML(project) {
    const liveLinkHTML = project.liveLink
      ? `<a href="${project.liveLink}" class="btn btn--med btn--theme project-modal__cta" target="_blank" rel="noopener noreferrer">View in Figma <span aria-hidden="true">↗</span></a>`
      : ''

    return `
      <span class="project-modal__eyebrow">${project.number} · ${project.focus}</span>
      <h2 class="project-modal__title" id="projectModalTitle">${project.title}</h2>
      <p class="project-modal__subtitle">${project.subtitle}</p>
      <p class="project-modal__lede">${project.description}</p>

      <img
        class="project-modal__cover"
        src="${project.image}"
        width="${project.imageWidth}"
        height="${project.imageHeight}"
        alt="${project.alt}"
        loading="lazy"
      />

      <dl class="project-modal__facts">
        <div class="project-modal__fact">
          <dt>Role</dt>
          <dd>${project.role}</dd>
        </div>
        <div class="project-modal__fact">
          <dt>Tools</dt>
          <dd>${project.tools}</dd>
        </div>
        <div class="project-modal__fact">
          <dt>Timeline</dt>
          <dd>${project.period}</dd>
        </div>
      </dl>

      <div class="project-modal__section">
        <h3>Problem</h3>
        <p>${project.problem}</p>
      </div>

      <div class="project-modal__section">
        <h3>Process</h3>
        <ol class="project-modal__steps">
          ${project.process.map(processStepHTML).join('')}
        </ol>
      </div>

      <div class="project-modal__section">
        <h3>Tools used</h3>
        <ul class="project-modal__tools">
          ${project.toolsUsed.map(toolTagHTML).join('')}
        </ul>
      </div>

      <div class="project-modal__section">
        <h3>Outcome</h3>
        <p>${project.outcome}</p>
      </div>

      <div class="project-modal__cta-row">
        ${liveLinkHTML}
      </div>
    `
  }

  function getFocusable() {
    return Array.from(
      panel.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex="0"]'
      )
    )
  }

  function onKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      closeModal()
      return
    }
    if (event.key !== 'Tab') return

    const focusable = getFocusable()
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function openModal(project) {
    if (!project) return
    body.innerHTML = modalBodyHTML(project)
    filename.textContent = project.file

    lastFocusedTrigger = document.activeElement
    modal.hidden = false
    document.documentElement.classList.add('has-modal-open')

    requestAnimationFrame(() => {
      modal.classList.add('project-modal--open')
    })

    panel.focus()
    document.addEventListener('keydown', onKeydown)

    if (history.pushState) {
      history.pushState(null, '', `#project-${project.id}`)
    }
  }

  function closeModal() {
    modal.classList.remove('project-modal--open')
    document.documentElement.classList.remove('has-modal-open')
    document.removeEventListener('keydown', onKeydown)

    const finish = () => {
      modal.hidden = true
      body.innerHTML = ''
    }

    if (prefersReducedMotion) {
      finish()
    } else {
      modal.addEventListener('transitionend', finish, { once: true })
    }

    if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus()
    }

    if (location.hash.startsWith('#project-') && history.pushState) {
      history.pushState(null, '', location.pathname + location.search + '#projects')
    }
  }

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-project-id]')
    if (trigger) {
      const project = PROJECTS.find((p) => p.id === trigger.dataset.projectId)
      openModal(project)
      return
    }
    if (event.target.closest('[data-modal-dismiss]')) {
      closeModal()
    }
  })

  function openFromHash() {
    const match = location.hash.match(/^#project-(.+)$/)
    if (!match) return
    const project = PROJECTS.find((p) => p.id === match[1])
    if (project) openModal(project)
  }

  window.addEventListener('hashchange', openFromHash)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', openFromHash)
  } else {
    openFromHash()
  }
})()
