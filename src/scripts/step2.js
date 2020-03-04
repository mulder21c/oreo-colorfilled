import "../scss/step2.scss";
import "Modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "Modules/@fortawesome/fontawesome-free/scss/solid.scss";
import Accordion from './Accordion';
import store from './Store';
import colorList from './Store/colorList';

const {design} = store.getData([`design`]);
if(design === undefined) {
  location.replace(`index.html`);
}
store.resetSelectedItems([`colors`]);

const nextStepBtn = document.querySelector(`.next-step`);

const DrawColor = (el) => {
  if(!el) throw new Error(`DrawCanvas is not defined`);
  const root = el;
  const bgColorButtons = el.querySelectorAll(`[name="draw-bg"].coloring__checkbox + .coloring__button`);
  const groupAColorButtons = el.querySelectorAll(`[name="draw-groupa"].coloring__checkbox + .coloring__button`);
  const groupBColorButtons = el.querySelectorAll(`[name="draw-groupb"].coloring__checkbox + .coloring__button`);
  const groupCColorButtons = el.querySelectorAll(`[name="draw-groupc"].coloring__checkbox + .coloring__button`);
  const checkboxes = el.querySelectorAll(`input[type="radio"]`);
  const bgImg = el.querySelector('.canvas__layer--color-bg');
  const groupAImg = el.querySelector('.canvas__layer--color-groupa');
  const groupBImg = el.querySelector('.canvas__layer--color-groupb');
  const groupCImg = el.querySelector('.canvas__layer--color-groupc');
  const sketchLayers = el.querySelectorAll('[class*="canvas__layer--sketch-"]');

  const loadDefaultSketches = (design) => {
    if(design === undefined) throw new Error(`[DrawColor] design is not defined`);

    const sketchPath = `images/ct${design + 1}_bg_0_0.svg`;
    const groupAPath = `images/ct${design + 1}_bg_0_1.svg`;
    const groupBPath = `images/ct${design + 1}_bg_0_2.svg`;
    const groupCPath = `images/ct${design + 1}_bg_0_3.svg`;

    root.querySelector('.canvas__layer--sketch-bg').src = sketchPath;
    root.querySelector('.canvas__layer--sketch-groupa').src = groupAPath;
    root.querySelector('.canvas__layer--sketch-groupb').src = groupBPath;
    root.querySelector('.canvas__layer--sketch-groupc').src = groupCPath;

    Array.from(bgColorButtons).forEach((elem, idx) => {
      elem.classList.add(`coloring__button--${colorList[design]["bg"][idx]["class"]}`)
    });
    Array.from(groupAColorButtons).forEach((elem, idx) => {
      elem.classList.add(`coloring__button--${colorList[design]["groupa"][idx]["class"]}`)
    });
    Array.from(groupBColorButtons).forEach((elem, idx) => {
      elem.classList.add(`coloring__button--${colorList[design]["groupb"][idx]["class"]}`)
    });
    Array.from(groupCColorButtons).forEach((elem, idx) => {
      elem.classList.add(`coloring__button--${colorList[design]["groupc"][idx]["class"]}`)
    });
    for(let sketchLayer of sketchLayers) {
      sketchLayer.classList.add(`dehighlight`);
    }
  }

  const handleColorCheck = (design, event) => {
    const el = event.currentTarget;
    const category = el.getAttribute(`name`).replace(`draw-`, ``);
    const value = el.value * 1 + 1;

    switch (category) {
      case `bg`:
        bgImg.src = `images/ct${design + 1}_bg_${Number(value)}.svg`;
        break;
      case `groupa`:
        groupAImg.src = `images/ct${design + 1}_1_${Number(value)}.svg`;
        break;
      case `groupb`:
        groupBImg.src = `images/ct${design + 1}_2_${Number(value)}.svg`;
        break;
      case `groupc`:
        groupCImg.src = `images/ct${design + 1}_3_${Number(value)}.svg`;
        break;
    }

    if(getChecked(checkboxes).length >= 4) {
      for(let layer of sketchLayers) {
        layer.classList.remove(`dehighlight`);
      }
    }
  };

  const getChecked = (target) => {
    target = target || checkboxes;
    const obj = {length: 0};
    Array.from(target)
      .filter(item => item.checked)
      .forEach(item => {
        obj[item.name.replace(`draw-`, ``)] = item.value * 1;
        obj.length += 1;
      });
    return obj;
  }

  return {
    init(design) {
      loadDefaultSketches(design);
      for(let checkbox of checkboxes) {
        checkbox.addEventListener(`change`, handleColorCheck.bind(null, design), false);
      }
    },
    highlightLayer(event) {
      const activated = event.detail.activateEl.id.replace(/draw\-|-legend/g, ``);

      for(let layer of sketchLayers) {
        if(layer.matches(`.canvas__layer--sketch-${activated}`) ) {
          layer.classList.remove(`dehighlight`);
        }else if(getChecked(checkboxes).length < 4){
          layer.classList.add(`dehighlight`);
        }
      }
    },
    validate(event) {
      return getChecked(checkboxes).length == 4;
    },
    getChecked,
  }
}

const drawColor = DrawColor(document.querySelector(`.canvas__container`));
drawColor.init(design);

const accordionRoot = document.querySelector(`.coloring-accordion`);
accordionRoot.addEventListener(`selected`, drawColor.highlightLayer, false);

const accordion = new Accordion({
  root: accordionRoot,
  tabs: document.querySelectorAll(`.coloring-accordion__tab`),
  panels: document.querySelectorAll(`.coloring-accordion__panel`),
  activeClass: `active`,
});

nextStepBtn.addEventListener(`click`, event => {
  if(!drawColor.validate()) {
    event.preventDefault();
    alert(`색을 모두 칠하지 않으셨어요~`);
    return;
  }
  const {bg, groupa, groupb, groupc} = drawColor.getChecked();
  store.setSelectedColor({bg, groupa, groupb, groupc});
}, false);