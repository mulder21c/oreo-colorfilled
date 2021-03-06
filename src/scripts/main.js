import "../scss/index.scss";
import "./Carousel/assets/index.scss";
import "Modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "Modules/@fortawesome/fontawesome-free/scss/solid.scss";
import Carousel from './Carousel';
import store from './Store';

new Carousel({
  root: document.querySelector(`.oreo-introduce`),
  slide: document.querySelector(`.slides`),
  slideItems: document.querySelectorAll(`.slides__item`),
  prevBtn: document.querySelector(`.slides__controls__prev`),
  nextBtn: document.querySelector(`.slides__controls__next`),
});

store.clear();