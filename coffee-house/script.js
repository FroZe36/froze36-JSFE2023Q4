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
  sliderBtnNext = document.querySelector('.slider__btn_right'),
  progressElem = document.querySelectorAll('.slider__control_progress');

let sliderIndex = 0,
  sliderWidth,
  initialPoint,
  finalPoint;

if (window.innerWidth > 520) {
  sliderWidth = 480;
  showSlide(sliderWidth);
  slider.style.width = '480px';
} else {
  sliderWidth = 348;
  showSlide(sliderWidth);
  slider.style.width = '348px';
}

window.addEventListener('resize', e => {
  sliderWidth = slider.clientWidth;
  if (e.target.innerWidth > 520) {
    slider.style.width = '480px';
    showSlide(sliderWidth);
  }
  if (e.target.innerWidth <= 520) {
    slider.style.width = '348px';
    showSlide(sliderWidth);
  }
});

sliderBtnPrev.addEventListener('click', prevSlide);
sliderBtnNext.addEventListener('click', nextSlide);
progressElem.forEach(item =>
  item.addEventListener('animationend', e => autoSlide(e)),
);
slideWrapper.addEventListener('mouseover', e => Pause(e));
slideWrapper.addEventListener('mouseout', e => Play(e));
slideWrapper.addEventListener('touchstart', e => {
  e.preventDefault();
  e.stopPropagation();
  initialPoint = e.changedTouches[0];
  Pause(e);
});
slideWrapper.addEventListener('touchend', e => {
  e.preventDefault();
  e.stopPropagation();
  finalPoint = e.changedTouches[0];
  const x = Math.abs(initialPoint.pageX - finalPoint.pageX);
  Play(e);
  if (x > 20) {
    if (finalPoint.pageX < initialPoint.pageX) {
      prevSlide();
    } else {
      nextSlide();
    }
  }
});

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

function Pause(state) {
  if (state.type === 'mouseover' || state.type === 'touchstart') {
    sliderControls.forEach((item, i) => {
      if (item.classList.contains('active')) {
        progressElem[i].style['animation-play-state'] = 'paused';
      }
    });
  }
}

function Play(state) {
  if (state.type === 'mouseout' || state.type === 'touchend') {
    sliderControls.forEach((item, i) => {
      if (item.classList.contains('active')) {
        progressElem[i].style['animation-play-state'] = 'running';
      }
    });
  }
}

function showSlide(widthNum) {
  slides.forEach(item => {
    item.style['min-width'] = `${widthNum}px`;
  });
  rollSlider();
}

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

function autoSlide(state) {
  if (state.isTrusted) {
    nextSlide();
  }
}

function activeSlide(index) {
  sliderControls.forEach(item => item.classList.remove('active'));
  sliderControls[index].classList.add('active');
}

activeSlide(sliderIndex);
