// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  const isOpen = smallMenu.classList.contains('header__sm-menu--active')
  smallMenu.classList.toggle('header__sm-menu--active', !isOpen)
  headerHamMenuBtn.classList.toggle('d-none', !isOpen)
  headerHamMenuCloseBtn.classList.toggle('d-none', isOpen)
  hamMenuBtn.setAttribute('aria-expanded', String(!isOpen))
  hamMenuBtn.setAttribute('aria-label', !isOpen ? 'Close menu' : 'Open menu')
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
    hamMenuBtn.setAttribute('aria-expanded', 'false')
    hamMenuBtn.setAttribute('aria-label', 'Open menu')
  })
}
