import "../scss/step1.scss";
import "./Carousel/assets/index.scss";
import "Modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "Modules/@fortawesome/fontawesome-free/scss/solid.scss";
import Carousel from './Carousel';
import store from './Store';

store.resetSelectedItems([`design`]);

const designGuide = [
  `oreo world 디자인은 오레오의 다양한 7가지 맛을 표현한 디자인입니다.`,
  `oreo cooking 디자인은 오레오를 다양한 디저트로 표현한 디자인입니다.`,
  `디자이너가 미리 색을 지정해 놓은 <span class="sr-only">따듯한 느낌을 주는 노란색 계열의</span> 프리셋 디자인입니다.`,
  `디자이너가 미리 색을 지정해 놓은 <span class="sr-only">꽃을 연상 시키는 옅은 핑크색 계열의</span> 프리셋 디자인입니다.`,
  `디자이너가 미리 색을 지정해 놓은 <span class="sr-only">청량감 가득한 파란색 계열의</span> 프리셋 디자인입니다.`,
];
const carouselRoot = document.querySelector(`.select-design`);
const nextStepBtn = document.querySelector(`.next-step`);

const carousel = new Carousel({
  root: carouselRoot,
  slide: document.querySelector(`.slides`),
  slideItems: document.querySelectorAll(`.slides__item`),
  prevBtn: document.querySelector(`.slides__controls__prev`),
  nextBtn: document.querySelector(`.slides__controls__next`),
  liveRegion: document.querySelector(`.slides__indicator__desc`),
  liveDictionary: designGuide,
  indicatorRoot: document.querySelector(`.slides__indicator`),
  indicators: document.querySelectorAll(`.slides__indicator__item`),
});

nextStepBtn.addEventListener(`click`, event => {
  const currIdx = carousel.getCurrIdx();
  store.setSelectedDesign(currIdx);
  if(currIdx > 1) {
    event.preventDefault();
    store.setSelectedColor(null);
    location.href = `step3.html`;
  };
}, false);