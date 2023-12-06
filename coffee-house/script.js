'use strict';

//Burger menu
const burgerButton = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const headerLinks = document.querySelectorAll('.header__link')
burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('active');
  headerNav.classList.toggle('active');
  document.body.classList.toggle('no-scroll')
});
function close() {
  burgerButton.classList.remove('active');
  headerNav.classList.remove('active');
  document.body.classList.remove('no-scroll');
}
headerLinks.forEach(item => item.addEventListener('click', close));
document.addEventListener('click', e => {
  console.log(e.target)
  if (
    (!burgerButton.classList.contains('active') ||
      !headerNav.contains(e.target)) &&
    !burgerButton.contains(e.target)
  ) {
    close();
  }
});
// document.addEventListener('resize', (e) => {
//   e.
// })
