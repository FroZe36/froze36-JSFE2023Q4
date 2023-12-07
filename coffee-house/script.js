'use strict';

//------------------------------------------------------------Burger menu------------------------------------------------------------
const burgerButton = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const headerLinks = document.querySelectorAll('.header__link');
burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('active');
  headerNav.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});
function close() {
  burgerButton.classList.remove('active');
  headerNav.classList.remove('active');
  document.body.classList.remove('no-scroll');
}
headerLinks.forEach(item => item.addEventListener('click', close));
document.addEventListener('click', e => {
  if (
    (!burgerButton.classList.contains('active') ||
      !headerNav.contains(e.target)) &&
    !burgerButton.contains(e.target)
  ) {
    close();
  }
});

//------------------------------------------------------------Slider------------------------------------------------------------

const slider = document.querySelector('.slider__wrapper'),
  slideWrapper = document.querySelector('.slide'),
  slides = document.querySelectorAll('.slider__slide'),
  sliderControls = document.querySelectorAll('.slider__control'),
  sliderBtnPrev = document.querySelector('.slider__btn_left'),
  sliderBtnNext = document.querySelector('.slider__btn_right');


let sliderIndex = 0;
let sliderWidth = 480;

sliderBtnPrev.addEventListener('click', prevSlide);
sliderBtnNext.addEventListener('click', nextSlide);

function prevSlide() {
  sliderIndex--;
  rollSlider();
  activeSlide(sliderIndex);
}
function nextSlide() {
  sliderIndex++;
  rollSlider();
  activeSlide(sliderIndex);
}
// function showSlide() {
//   slides.forEach((slide) => )
// }
function rollSlider() {
  if (sliderIndex < 0) {
    sliderIndex = slides.length - 1;
  }
  if (sliderIndex > slides.length - 1) {
    sliderIndex = 0;
  }
  slideWrapper.style.transform = `translateX(${-(
    sliderWidth * sliderIndex
  )}px)`;
}
function activeSlide(index) {
  sliderControls.forEach(item =>
    item.classList.remove('slider__control_active'),
  );
  sliderControls[index].classList.add('slider__control_active');
}
activeSlide(sliderIndex);
// activeSlide(sliderIndex);
// document.addEventListener('resize', (e) => {
//   e.
// })
