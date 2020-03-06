import "../scss/step3.scss";
import "Modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "Modules/@fortawesome/fontawesome-free/scss/solid.scss";
import store from './Store';

const {design, colors} = store.getData([`design`, `colors`]);
const prevStepBtn = document.querySelector(`.prev-step`);
const nextStepBtn = document.querySelector(`.next-step`);

const MessageView = (el) => {
  if(!el) throw new Error(`MessageView's RootElement is not defined`);
  const bgImg = el.querySelector('.canvas__layer--color-bg');
  const groupAImg = el.querySelector('.canvas__layer--color-groupa');
  const groupBImg = el.querySelector('.canvas__layer--color-groupb');
  const groupCImg = el.querySelector('.canvas__layer--color-groupc');
  const sketchLayer = el.querySelector('.canvas__layer--sketch');
  const msgTo = el.querySelector('.message__to');
  const msgBody = el.querySelector('.message__body');

  const loadLayers = ({design, colors}) => {
    sketchLayer.src= `images/ct${design + 1}_bg_0.svg`;
    if(colors){
      bgImg.src = `images/ct${design + 1}_bg_${colors.bg}.svg`;
      groupAImg.src = `images/ct${design + 1}_1_${colors.groupa}.svg`;
      groupBImg.src = `images/ct${design + 1}_2_${colors.groupb}.svg`;
      groupCImg.src = `images/ct${design + 1}_3_${colors.groupc}.svg`;
    }
  }


  return {
    init({design, colors}) {
      loadLayers({design, colors});
    },
    getMessage() {
      return {
        to: msgTo.value.trim(),
        body: msgBody.value.trim(),
      }
    },
    validate() {
      return !!(msgTo.value.trim() && msgBody.value.trim());
    }
  }
};

const message = MessageView(document.querySelector(`.message`));
message.init({design, colors});
prevStepBtn.addEventListener(`click`, event => {
  if(design > 1) {
    event.preventDefault();
    location.href = `step1.html`;
  }
}, false);
nextStepBtn.addEventListener(`click`, event => {
  if(!message.validate()) {
    event.preventDefault();
    alert(`메세지를 입력해주세요`);
    return;
  }
  store.setMesssage(message.getMessage());
}, false);