// header sticky





window.onscroll = function () {
  scroll();
};

console.log(document.body.clientWidth)

let prevScrollpos = window.pageYOffset;
function scroll() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("head").style.position = "fixed";
    document.getElementById("head").style.top = "0";
    document.getElementById("menu").style.top = "39px";
    if (document.body.clientWidth > 380) {
      document.getElementById("menu").style.marginTop = "47px";
    }

    document.getElementById("menu").style.marginTop = "0";
  } else if (prevScrollpos < currentScrollPos) {
    document.getElementById("menu").style.top = "0";
    document.getElementById("menu").style.marginTop = "0";
    document.getElementById("head").style.position = "fixed";
    document.getElementById("head").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

// splider slider

document.addEventListener('DOMContentLoaded', function () {
  var splide = new Splide('.splide', {
    type: 'loop',
    autoWidth: true,
    padding: '7%',
    gap: '6px',
    pagination: false,
  });
  splide.mount();
});

function onSliderClick(event) {
  if (event.target.tagName === 'BUTTON') {
    let button = event.target;
    const frame = event.target.nextElementSibling
    const link = frame.dataset.src;
    button.style.display = 'none';
    frame.setAttribute('src', link);
    frame.removeAttribute('data-src');
    frame.style.pointerEvents = "auto";
  }
}

document.querySelector('.slider__container').addEventListener('click', onSliderClick);
// modal with iframe

let modal = document.querySelector('.content__modal');
let openButton = document.querySelector('.banner__video-btn');

openButton.addEventListener('click', () => modal.classList.add('content__modal_opened'));
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('content__modal_opened');
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === 'Escape') {
    modal.classList.remove('content__modal_opened');
  }
})


// burger menu

let burger = document.querySelector('.header__menu-burger');
let close = document.querySelector('.header__menu-close');
let subbtn = document.querySelector('.header__menu-link_open');
let backbtn = document.querySelector('.header__menu_title');

burger.addEventListener('click', () => {
  burger.style.display = 'none';
  close.style.display = 'block';
  document.querySelector('.header__menu-items').style.display = 'flex';
  document.querySelector('.header__menu-burger-bottom').style.display = 'block';
  document.querySelector('.header__menu-burger-bottom').classList.add('header__menu-burger-bottom_open');
  document.querySelector('.header__menu-items').classList.add('header__menu-items_open');
})

close.addEventListener('click', () => {
  burger.style.display = 'block';
  close.style.display = 'none';
  document.querySelector('.header__menu-items').style.display = 'none';
  document.querySelector('.header__menu-subitems').style.display = 'none';
})

window.addEventListener("resize", function () {
  if (window.matchMedia("(max-width: 375px)").matches) {
    subbtn.addEventListener('click', () => {
      document.querySelector('.header__menu-items').style.display = 'none';
      document.querySelector('.header__menu-subitems').style.display = 'flex';
      document.querySelector('.header__menu-subburger-bottom').style.display = 'block';
      document.querySelector('.header__menu-subburger-bottom').classList.add('header__menu-burger-bottom_open');
      document.querySelector('.header__menu-subitems').classList.add('header__menu-items_open');
    })
  }
});

backbtn.addEventListener('click', () => {
  document.querySelector('.header__menu-subitems').style.display = 'none';
  document.querySelector('.header__menu-subburger-bottom').style.display = 'none';
  document.querySelector('.header__menu-items').style.display = 'flex';
  document.querySelector('.header__menu-burger-bottom').style.display = 'block';
  document.querySelector('.header__menu-burger-bottom').classList.add('header__menu-burger-bottom_open');
  document.querySelector('.header__menu-items').classList.add('header__menu-items_open');
})

// badges slider

const getElement = (selector) => {
  return document.querySelector(selector);
}
const getElements = (selector) => {
  return document.querySelectorAll(selector);
}

let imagePosition = 0;
const sliderItems = document.querySelectorAll(".image-slider-item");
const totalImageItems = document.querySelectorAll(".image-slider-item").length;
const imageSliderWrapper = document.querySelector('.image-wrapper');
const imageWrapperWidth = imageSliderWrapper.offsetWidth;
const imageWrapperHeight = imageSliderWrapper.offsetHeight;
const firstElement = sliderItems[0];
const lastElement = sliderItems[sliderItems.length - 1];
const itemWidth = firstElement.offsetWidth;
let itemPerSlide = 5;
const setImageSliderTransform = () => {
  const slider = document.querySelector('.image-slider');
  const itemWidth = sliderItems[0].offsetWidth;
  slider.style["transform"] = 'translate3d(' + (-imagePosition * itemWidth - imagePosition * 3) + 'px,0,0)';
}

function prevNavClick() {
  const firstElementLeft = firstElement.getBoundingClientRect().left;
  const lastElementRight = lastElement.getBoundingClientRect().right;
  imagePosition = Math.max(imagePosition - 1, 0);
  if (imagePosition === 0) {
    document.getElementsByClassName("nav-left-arrow")[0].style['visibility'] = 'visible';
  }
  if (imagePosition + itemPerSlide < totalImageItems) {
    document.getElementsByClassName("nav-right-arrow")[0].style['visibility'] = 'visible';
  }
  setImageSliderTransform();
}

function nextNavClick() {
  const firstElementLeft = firstElement.getBoundingClientRect().left;
  const lastElementRight = lastElement.getBoundingClientRect().right;
  imagePosition = Math.min(imagePosition + 1, totalImageItems - 1);
  if (imagePosition > 0) {
    document.getElementsByClassName("nav-left-arrow")[0].style['visibility'] = 'visible';
  }
  if (imagePosition + itemPerSlide === totalImageItems) {
    document.getElementsByClassName("nav-right-arrow")[0].style['visibility'] = 'visible';
  }
  setImageSliderTransform();
}

window.onload = function () {
  if (sliderItems.length <= itemPerSlide) {
    document.getElementsByClassName("nav-right-arrow")[0].style['visibility'] = 'visible';
  }
}