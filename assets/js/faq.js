// "FAQ/" — the core questions someone should have answered before deciding
// to work together. Two entries below are marked draftReview: true because
// they're business/availability calls only Krina can make with certainty —
// review and edit those two before this goes live, then drop the
// "[Draft — please confirm]" prefix and the draftReview field.
const FAQS = [
  {
    id: 'freelance',
    file: 'faq_01.txt',
    draftReview: true,
    question: 'Are you open to freelance or contract work alongside your full-time role?',
    answer:
      "[Draft — please confirm] I'm full-time at Techlusion, but I'm open to select freelance or contract projects outside of that. Reach out and we can figure out if the timing and scope work.",
  },
  {
    id: 'day-to-day',
    file: 'faq_02.txt',
    question: 'What does working with you actually look like, day to day?',
    answer:
      "Mostly Figma and async check-ins — I share progress early and often instead of disappearing for a week and reappearing with a surprise. My Computer Engineering background also means I'm comfortable talking directly with developers about feasibility, not just handing off a file.",
  },
  {
    id: 'ai-workflow',
    file: 'faq_03.txt',
    question: 'You use AI tools a lot — does that mean less actual design thinking?',
    answer:
      "The opposite, honestly. Tools like Figma AI or Cursor speed up variations and prototyping, which frees up more time for the parts that actually need a human: user research, usability testing, and judging what's actually good.",
  },
  {
    id: 'design-to-code',
    file: 'faq_04.txt',
    question: 'Can you take a project from a Figma concept to working code?',
    answer:
      'Yes — I regularly prototype design-to-code with AI tools like Cursor and v0 to generate and refine HTML, CSS and React from a Figma concept, mainly to sanity-check feasibility with developers before full build.',
  },
  {
    id: 'remote',
    file: 'faq_05.txt',
    draftReview: true,
    question: 'Are you remote-friendly, or do you need to work on-site?',
    answer:
      "[Draft — please confirm] I currently work on-site in Ahmedabad, but I'm flexible on remote collaboration for outside projects — let's talk specifics.",
  },
  {
    id: 'get-in-touch',
    file: 'faq_06.txt',
    question: "What's the best way to start a conversation with you?",
    answer:
      "Email is easiest — see the Contact section below, or connect on LinkedIn. A short note on what you're working on is a great place to start.",
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
