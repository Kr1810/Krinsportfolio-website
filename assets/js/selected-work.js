// Single source of truth for the "Selected work" projects section AND the
// project case-study modal (assets/js/project-modal.js reads this same array).
// Add/edit a project here — markup is generated, never duplicated by hand.
//
// group: 'selected' = the 8 case studies from the current resume, shown first.
// group: 'earlier'  = the 4 original Figma-only projects, kept as a smaller
//                      "Earlier work" tier below rather than deleted — see
//                      legacyHref, which still points at the standalone
//                      project-N.html page each one originally shipped with.
const PROJECTS = [
  {
    id: 'sw-habitation-blog',
    group: 'selected',
    number: '01',
    file: 'sw_habitation.blog',
    title: 'SW Habitation Blog Site',
    subtitle: 'Developer-focused tech blog · Web',
    period: 'Jan – Apr 2025',
    description:
      'A developer-focused tech blog redesign built around a minimal, readable layout and a clear page flow.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Web Design · Content Layout',
    image: './images/portfolio-assets/project-img/sw-habitation-blog-site.webp',
    imageWidth: 1600,
    imageHeight: 1199,
    alt: 'SW Habitation developer blog redesign, showing the article layout',
    problem:
      "The existing blog buried genuinely useful technical writing under a cluttered layout, making it hard for developer readers to scan articles or find what they came for.",
    process: [
      'Audited the existing blog structure to see where readers were dropping off mid-article.',
      'Simplified the page hierarchy around a minimal, text-first layout built for reading long-form technical content.',
      'Designed a consistent flow from article list to single-post view, so navigation feels predictable across the site.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A calmer, more readable blog experience that puts the writing first, with a page flow developers can move through without thinking about it.',
    liveLink: null,
  },
  {
    id: 'somish-realty',
    group: 'selected',
    number: '02',
    file: 'somish_realty.web',
    title: 'SOMISH Realty Website',
    subtitle: 'Real-estate website redesign · Web',
    period: '2025',
    description:
      'A real-estate site redesign focused on clean layouts and faster property search across every page.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Web Design · UX Research',
    image: './images/portfolio-assets/project-img/somish-realty-website.webp',
    imageWidth: 1600,
    imageHeight: 1201,
    alt: 'SOMISH Realty real-estate website redesign, property listings view',
    problem:
      "Property listings were hard to browse and compare, and the visual design didn't carry the sense of trust a real-estate brand needs to build with visitors.",
    process: [
      'Mapped the property search journey end-to-end, from landing page to listing detail.',
      'Redesigned listing and search layouts for clarity, with a consistent property card across the site.',
      'Applied a clean, trust-focused visual system to every page, not just the homepage.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A cleaner browsing experience that makes it easier to search, compare and shortlist properties from any page.',
    liveLink: null,
  },
  {
    id: 'explore-local-events',
    group: 'selected',
    number: '03',
    file: 'explore_events.app',
    title: 'Explore Local Events App',
    subtitle: 'Event discovery app · Mobile',
    period: '2025',
    description:
      'An event discovery app case study focused on quick access to nearby events and a clear booking flow.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Mobile UX · Booking Flow',
    image: './images/portfolio-assets/project-img/explore-local-events-app.webp',
    imageWidth: 1600,
    imageHeight: 1201,
    alt: 'Explore Local Events mobile app screens, event listing and booking flow',
    problem:
      'Discovering and booking a local event can feel scattered across too many taps — this case study set out to shorten that path.',
    process: [
      'Designed a home screen that surfaces relevant events quickly, without heavy filtering up front.',
      'Simplified event details and booking into a small number of clear steps.',
      'Prototyped the flow in Figma to catch friction points before visual polish.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A mobile experience where finding and booking a local event takes a few clear steps, not a scavenger hunt.',
    liveLink: null,
  },
  {
    id: 'cricket-scoreboard',
    group: 'selected',
    number: '04',
    file: 'cricket_scoreboard.app',
    title: 'Cricket Scoreboard App',
    subtitle: 'Live-score app redesign · Mobile',
    period: '2025',
    description:
      'A live-score app redesign using card-based layouts for stats, commentary and news.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Mobile UX · Information Design',
    image: './images/portfolio-assets/project-img/cricket-scoreboard-app.webp',
    imageWidth: 1600,
    imageHeight: 1262,
    alt: 'Cricket Scoreboard app redesign, card-based live score and commentary layout',
    problem:
      'Live match data — scores, commentary, stats, news — all needed to live on one screen without overwhelming the user.',
    process: [
      'Broke the match experience into modular, card-based sections for scores, commentary, stats and news.',
      'Prioritized live score and commentary as the primary view, with stats and news a tap away.',
      'Designed for quick scanning, since most fans check scores in short bursts.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A card-based layout that keeps live scores glanceable while still giving fans deeper stats and commentary on demand.',
    liveLink: null,
  },
  {
    id: 'weather-app',
    group: 'selected',
    number: '05',
    file: 'weather.app',
    title: 'Weather App',
    subtitle: 'Dark-themed forecast app · Mobile',
    period: '2025',
    description:
      'A dark-themed forecast app showing essential weather data in a minimal layout.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Mobile UX · Dark Theme',
    image: './images/portfolio-assets/project-img/weather-app.webp',
    imageWidth: 1600,
    imageHeight: 1217,
    alt: 'Weather app dark theme redesign, minimal forecast layout',
    problem:
      "Weather apps often overload the home screen with data the user doesn't need in the first five seconds.",
    process: [
      'Identified the handful of data points — current conditions, hourly, weekly — users actually check first.',
      'Designed a dark theme suited to quick, everyday glances, cutting visual noise.',
      'Kept the layout minimal so essential weather data reads instantly.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A minimal, dark-themed forecast screen that leads with what matters and leaves the rest a scroll away.',
    liveLink: null,
  },
  {
    id: 'dental-practice',
    group: 'selected',
    number: '06',
    file: 'dental_practice.web',
    title: 'Dental Practice Website',
    subtitle: 'Landing page redesign · Web',
    period: '2025',
    description:
      'A landing page redesign built to earn trust and guide visitors toward booking an appointment.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Web Design · Conversion',
    image: './images/portfolio-assets/project-img/dental-practice-website.webp',
    imageWidth: 1600,
    imageHeight: 1199,
    alt: 'Dental practice landing page redesign, appointment booking focus',
    problem:
      "The original site didn't do enough to build trust or make booking an appointment feel like the obvious next step.",
    process: [
      'Reworked the landing page narrative around trust signals — credibility, care approach, patient-first tone.',
      'Simplified the page toward a single, clear goal: booking an appointment.',
      'Designed calm, approachable visuals appropriate for a healthcare audience.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A landing page that builds confidence early and makes booking an appointment the obvious next step.',
    liveLink: null,
  },
  {
    id: 'yugal-matrimony',
    group: 'selected',
    number: '07',
    file: 'yugal_matrimony.web',
    title: 'Yugal Matrimony Website',
    subtitle: 'Home page redesign · Web',
    period: '2025',
    description:
      'A home page redesign with an elegant, trust-focused feel for Indian matchmaking.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Web Design · Visual Design',
    image: './images/portfolio-assets/project-img/yugal-matrimony-website.webp',
    imageWidth: 1600,
    imageHeight: 1199,
    alt: 'Yugal Matrimony homepage redesign, elegant trust-focused layout',
    problem:
      "Matrimony platforms need to feel elegant and trustworthy fast, and the existing homepage wasn't setting that tone.",
    process: [
      'Studied the emotional and cultural expectations around an Indian matchmaking platform.',
      'Designed a homepage layout that balances warmth with credibility.',
      'Built a trust-first visual language, from imagery choices to typography.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A homepage that feels elegant and trustworthy from the first scroll — a stronger first impression for a sensitive decision.',
    liveLink: null,
  },
  {
    id: 'news-blog',
    group: 'selected',
    number: '08',
    file: 'news_and_blog.web',
    title: 'News & Blog Website',
    subtitle: 'Modern, responsive blog redesign · Web',
    period: '2025',
    description:
      'A modern, responsive blog redesign balancing content discovery and a strong editorial presence.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'Web Design · Responsive Layout',
    image: './images/portfolio-assets/project-img/news-and-blog-website.webp',
    imageWidth: 1600,
    imageHeight: 1199,
    alt: 'News and blog website redesign, responsive editorial layout',
    problem:
      'The site needed to help readers discover more content without diluting its editorial, magazine-like feel.',
    process: [
      'Designed a homepage that balances featured editorial content with easy content discovery.',
      'Built a responsive layout that holds its visual hierarchy across every screen size.',
      'Kept typography and layout choices consistent with a strong editorial identity.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A responsive blog experience that reads like a considered publication, not just a list of posts.',
    liveLink: null,
  },
  {
    id: 'restro',
    group: 'earlier',
    number: '01',
    file: 'restro.fig',
    title: 'Restro',
    subtitle: 'Restaurant ordering experience',
    period: '2024',
    description:
      'A mobile menu experience focused on clear navigation and an easy, visually appealing ordering journey.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'UI Design · Mobile UX',
    image: './images/Restro-menu.webp',
    imageWidth: 1440,
    imageHeight: 1024,
    alt: 'Restro restaurant menu mobile UI screens',
    problem:
      'Restaurant menus can feel cluttered on mobile — the goal was a clear, categorized menu that makes ordering feel effortless.',
    process: [
      'Structured the menu into clearly defined categories for intuitive navigation.',
      'Designed a landing page with smart animation effects for an engaging entry point.',
      'Crafted an original app logo to give the design a cohesive, polished look.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A visually appealing, user-centric restaurant menu that stays functional and easy to navigate.',
    liveLink:
      'https://www.figma.com/design/GS3ViNpjQInZOA8hu6GpeE/restaurant-menu?node-id=0-1&t=UPuAKhDb4ECOrsiM-1',
    legacyHref: './project-1.html',
  },
  {
    id: 'signup-login-flow',
    group: 'earlier',
    number: '02',
    file: 'login-flow.fig',
    title: 'Sign up & Login Flow',
    subtitle: 'Authentication & onboarding',
    period: '2024',
    description:
      'A sample sign-up and login flow designed for a user-friendly, efficient mobile onboarding experience.',
    role: 'UI/UX Designer',
    tools: 'Figma',
    focus: 'UX Flow · Wireframes · UI Design',
    image: './images/Login.webp',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'Sign up and login flow mobile UI screens',
    problem:
      'Mobile onboarding often loses users to friction — the goal was a signup and login flow that feels effortless, personalized and secure.',
    process: [
      'Designed a flow that minimizes friction while still collecting the information needed.',
      'Built in personalization and error-handling to keep the journey smooth.',
      'Prioritized security-conscious design choices to build trust from the first screen.',
    ],
    toolsUsed: ['Figma'],
    outcome: 'A short, secure onboarding flow that gets users signed up without confusion.',
    liveLink:
      'https://www.figma.com/design/vTldksWrR34RLlrqHGtiAM/mobile-app-signup?node-id=0-1&t=8d1Kqv8Ir3e0di8X-1',
    legacyHref: './project-2.html',
  },
  {
    id: 'ecommerce-wireframe',
    group: 'earlier',
    number: '03',
    file: 'zara-wireframe.fig',
    title: 'E-Commerce Wireframe',
    subtitle: 'Clothing app redesign · ZARA',
    period: '2024',
    description:
      'A wireframe redesign of the ZARA app aimed at making browsing and shopping more intuitive and user-friendly.',
    role: 'UX Designer',
    tools: 'Figma',
    focus: 'UX Research · Wireframes',
    image: './images/Wireframe.webp',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'ZARA e-commerce app wireframe screens',
    problem:
      "The ZARA app's navigation and shopping flow had usability pain points that made browsing harder than it needed to be.",
    process: [
      'Researched the existing app to identify common navigation and usability issues.',
      'Built low-fidelity wireframes in Figma focused on layout and structure, iterating on feedback.',
      'Prototyped key flows — home, product listing, product view, checkout — for testing.',
    ],
    toolsUsed: ['Figma'],
    outcome:
      'A wireframe redesign introducing dark mode and AI-based recommendations, aimed at more intuitive shopping.',
    liveLink:
      'https://www.figma.com/design/xwP81fom96GIkk4qJJMRWl/e-commerce-wireframe?node-id=0-1&t=ijRzUukwvv2W4eJj-1',
    legacyHref: './project-3.html',
  },
  {
    id: 'email-template',
    group: 'earlier',
    number: '04',
    file: 'email-template.ai',
    title: 'E-mail Template',
    subtitle: 'Marketing email design',
    period: '2024',
    description: 'A professional, engaging email template designed for marketing communications.',
    role: 'Graphic Designer',
    tools: 'Illustrator',
    focus: 'Visual Design · Layout',
    image: './images/E-Mail Template.webp',
    imageWidth: 1512,
    imageHeight: 982,
    alt: 'Marketing email template design',
    problem:
      'Marketing emails need to be visually engaging and easy for anyone to customize, regardless of technical background.',
    process: [
      'Combined colors, fonts and imagery into an engaging, readable design.',
      'Designed with simplicity in mind so the template is easy to customize and implement.',
      'Built the layout to adapt cleanly across desktop, tablet and smartphone.',
    ],
    toolsUsed: ['Illustrator'],
    outcome: 'A responsive, professional email template ready for marketing campaigns on any device.',
    liveLink:
      'https://www.figma.com/design/JjyTRv12O1ENP8XrUnIMO6/email-template?node-id=0-1&t=BK02KvnICI0EXZ78-1',
    legacyHref: './project-4.html',
  },
]

function selectedWorkItemHTML(project) {
  return `
    <article class="selected-work__item">
      <button
        type="button"
        class="selected-work__window"
        data-project-id="${project.id}"
        aria-haspopup="dialog"
        aria-label="${project.title} — ${project.subtitle}. Open case study"
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
          <span class="selected-work__overlay">
            <span class="selected-work__cta">
              See project <span class="selected-work__cta-arrow" aria-hidden="true">↗</span>
            </span>
          </span>
        </span>
      </button>
    </article>
  `
}

const selectedWorkList = document.getElementById('selectedWorkList')

if (selectedWorkList) {
  const selected = PROJECTS.filter((p) => p.group === 'selected')
  const earlier = PROJECTS.filter((p) => p.group === 'earlier')

  selectedWorkList.innerHTML = `
    <div class="selected-work__list">
      ${selected.map(selectedWorkItemHTML).join('')}
    </div>
    <div class="selected-work__secondary">
      <span class="selected-work__secondary-label">EARLIER_WORK/</span>
      <p class="selected-work__secondary-lede">
        A few earlier Figma-only projects from before this round of case studies.
      </p>
      <div class="selected-work__list selected-work__list--secondary">
        ${earlier.map(selectedWorkItemHTML).join('')}
      </div>
    </div>
  `

  const items = selectedWorkList.querySelectorAll('.selected-work__item')
  initScrollReveal(items, 'selected-work__item--visible')
}
