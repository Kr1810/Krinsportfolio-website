// "FAQ/" — the core questions someone should have answered before deciding
// to work together.
const FAQS = [
  {
    id: 'what-you-do',
    file: 'faq_01.txt',
    question: 'What do you do?',
    answer:
      'UI/UX and graphic design for web and mobile. I take a project from research through to a live, working site.',
  },
  {
    id: 'ai-workflow',
    file: 'faq_02.txt',
    question: 'How do you use AI in your work?',
    answer:
      'I use it to move faster, from early ideas to design-to-code prototypes. Research, testing, and the final design calls stay with me.',
  },
  {
    id: 'projects',
    file: 'faq_03.txt',
    question: 'What kind of projects have you worked on?',
    answer:
      'Mostly redesigns: blogs, real estate, events, matrimony, weather, and a cricket scoreboard app, across web and mobile.',
  },
  {
    id: 'tools',
    file: 'faq_04.txt',
    question: 'What tools do you use?',
    answer:
      "Figma for design, Webflow for building live sites, plus Adobe tools for visuals and video. I'm also comfortable enough in HTML, CSS, and React to talk feasibility with developers.",
  },
  {
    id: 'open-to-work',
    file: 'faq_05.txt',
    question: 'Are you open to work?',
    answer: 'Yes. Open to full-time roles, freelance projects.',
  },
]

function faqItemHTML(item, index) {
  const draftBadge = item.draftReview
    ? '<span class="faq__draft-badge">Draft</span>'
    : ''
  return `
    <div class="faq__item faq__reveal" style="--card-i: ${index}">
      <h3 class="faq__question-wrap">
        <button
          type="button"
          class="faq__question"
          id="faqHeading-${item.id}"
          aria-expanded="false"
          aria-controls="faqPanel-${item.id}"
        >
          <span class="faq__question-file">${item.file}</span>
          <span class="faq__question-text">${item.question}${draftBadge}</span>
          <span class="faq__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div
        class="faq__panel"
        id="faqPanel-${item.id}"
        role="region"
        aria-labelledby="faqHeading-${item.id}"
        aria-hidden="true"
      >
        <div class="faq__panel-inner"><p>${item.answer}</p></div>
      </div>
    </div>
  `
}

const faqList = document.getElementById('faqList')

if (faqList) {
  faqList.innerHTML = FAQS.map(faqItemHTML).join('')

  // Class-based open state (not the `hidden` attribute) so the CSS
  // grid-template-rows 0fr→1fr height transition can actually animate —
  // `hidden` forces display:none, which can't be transitioned.
  //
  // Exclusive accordion: opening one question closes whichever other one
  // was open, so only a single answer is ever visible at a time.
  function setQuestionOpen(button, open) {
    const panel = document.getElementById(button.getAttribute('aria-controls'))
    button.setAttribute('aria-expanded', String(open))
    if (panel) {
      panel.classList.toggle('faq__panel--open', open)
      panel.setAttribute('aria-hidden', String(!open))
    }
  }

  faqList.addEventListener('click', (event) => {
    const button = event.target.closest('.faq__question')
    if (!button) return

    const isOpen = button.getAttribute('aria-expanded') === 'true'

    if (!isOpen) {
      faqList.querySelectorAll('.faq__question[aria-expanded="true"]').forEach((openButton) => {
        if (openButton !== button) setQuestionOpen(openButton, false)
      })
    }

    setQuestionOpen(button, !isOpen)
  })

  const revealEls = faqList.querySelectorAll('.faq__reveal')
  initScrollReveal(revealEls, 'faq__reveal--visible')
}
