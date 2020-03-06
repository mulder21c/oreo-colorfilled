const Carousel = (() => {
  let settings = {};
  let current = {current: `current`};

  const reOrdering = (amount, slides, indicators = [] ) => {
    for(let i = -1, base = 2, isSelected = false, order; ++i < slides.length;) {
      order = (slides[i].style.order || (base + i)) * 1 - amount;
      order = order < 1 ? slides.length + order : order > slides.length ? order - slides.length : order;
      isSelected = order == 2;
      slides[i].style.order = order;
      slides[i].setAttribute(`aria-hidden`, JSON.stringify(order != 2));
      slides[i].setAttribute(`tabindex`, isSelected ? `0` : `-1`);
      slides[i].setAttribute(`role`, `tabpanel`);
      if(indicators[i]){
        indicators[i].setAttribute(`aria-selected`, isSelected ? `true` : `false`);
        indicators[i].setAttribute(`tabindex`, isSelected ? `0` : `-1`);
      }
    }
  };

  const applyAnimate = (slide, direction) => {
    if(direction > 0) slide.classList.remove(`is-revers`);
    else slide.classList.add(`is-revers`);
    slide.classList.remove(`is-set`);
    setTimeout(() => {
      slide.classList.add(`is-set`);
    }, 50);
  }

  const emitEvent = (el, event, detail) => {
    let customEvent;
    const params = {
      detail: {
        ...detail
      },
      bubbles: true,
      cancelable: true,
    };

    if (typeof window.CustomEvent === 'function') {
      customEvent = new CustomEvent(event, params);
    } else {
      customEvent = document.createEvent('CustomEvent');
      customEvent.initCustomEvent(event, true, true, params.detail);
    }

    el.dispatchEvent(customEvent);
  }

  const getAnnounceContent = (idx, reference) => {
    if(Array.isArray(reference))
      return reference[idx];
    else if(reference instanceof HTMLElement)
      return reference.getAttribute(`data-title`)
    else
      return ``;
  }

  const indicatorHandlerKeyEvt = function (event) {
    const keycode = event.keyCode || event.which;
    const {indicators, liveRegion} = this.config.get(settings);
    liveRegion.setAttribute(`aria-live`, `off`);
    switch(keycode) {
      case 37:
      case 38:
        this.prev();
        indicators[this.getCurrIdx()].focus();
        break;
      case 39:
      case 40:
        this.next();
        indicators[this.getCurrIdx()].focus();
        break;
    }
    setTimeout( () => {
      liveRegion.setAttribute(`aria-live`, `polite`)
    }, 10);
  };

  class Carousel {
    constructor(options) {
      if(! options.root || !options.slide)
        throw new Error(`'root' or 'slide' is not defined`);

      const config = {
        liveRegion: null,
        liveDictionary: null,
        indicatorRoot: null,
        indicators: [],
        ...options,
      };

      this.config = new WeakMap();
      this.currentIdx = new WeakMap([[current, 0]]);
      this.config.set(settings, config);

      this.init();
    }

    init() {
      const {
        root,
        slide,
        slideItems,
        prevBtn,
        nextBtn,
        liveRegion,
        liveDictionary,
        indicatorRoot,
        indicators,
      } = this.config.get(settings);
      slide.classList.add(`is-set`);

      if(liveRegion == null) {
        const newLiveRegion = document.createElement(`div`);
        const announceContent = getAnnounceContent(0, liveDictionary || slideItems[0]);
        newLiveRegion.setAttribute(`class`, `sr-only`);
        if(announceContent) newLiveRegion.innerHTML = announceContent;
        newLiveRegion.setAttribute(`aria-live`, `polite`);
        newLiveRegion.setAttribute(`aria-atomic`, `true`);
        newLiveRegion.setAttribute(`aria-relevant`, `text`);
        root.appendChild(newLiveRegion);

        this.config.set(settings, {
          ...this.config.get(settings),
          liveRegion: newLiveRegion
        });
      }else {
        const announceContent = getAnnounceContent(0, liveDictionary || slideItems[0]);
        if(announceContent) liveRegion.innerHTML = announceContent;
        liveRegion.setAttribute(`aria-live`, `polite`);
        liveRegion.setAttribute(`aria-atomic`, `true`);
        liveRegion.setAttribute(`aria-relevant`, `text`);
      }

      if(indicatorRoot) {
        indicatorRoot.setAttribute(`role`, `tablist`);
        for(let i = -1, indicator; indicator = indicators[++i];) {
          indicator.setAttribute(`role`, `tab`);
          indicator.addEventListener(`click`, ({currentTarget}) => {
            const idx = Array.from(indicators).indexOf(currentTarget);
            this.go(idx);
          }, false);
        }
        indicatorRoot.addEventListener(`keydown`, indicatorHandlerKeyEvt.bind(this), false);
      }

      reOrdering(0, slideItems, indicators);

      nextBtn.addEventListener('click', this.next.bind(this), false);
      prevBtn.addEventListener('click', this.prev.bind(this), false);
      emitEvent(slide, `init`, {currentIdx: this.currentIdx.get(current)});
    }

    next() {
      const {
        slide,
        slideItems,
        indicators,
        liveRegion,
        liveDictionary,
      } = this.config.get(settings);
      let currIdx = this.currentIdx.get(current) + 1;
      currIdx = currIdx > slideItems.length - 1 ? 0 : currIdx;
      this.currentIdx.set(current, currIdx);
      reOrdering(1, slideItems, indicators);
      applyAnimate(slide, 1);

      const announceContent = getAnnounceContent(currIdx, liveDictionary || slideItems[currIdx]);
      if(announceContent) liveRegion.innerHTML = announceContent;

      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    prev() {
      const {
        slide,
        slideItems,
        indicators,
        liveRegion,
        liveDictionary,
      } = this.config.get(settings);
      let currIdx = this.currentIdx.get(current) - 1;
      currIdx = currIdx < 0 ? slideItems.length - 1 : currIdx;
      this.currentIdx.set(current, currIdx);
      reOrdering(-1, slideItems, indicators);
      applyAnimate(slide, -1);

      const announceContent = getAnnounceContent(currIdx, liveDictionary || slideItems[currIdx]);
      if(announceContent) liveRegion.innerHTML = announceContent;

      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    go(idx) {
      const {
        slide,
        slideItems,
        indicators,
        liveRegion,
        liveDictionary,
      } = this.config.get(settings);
      const currentIdx = this.currentIdx.get(current);
      const amount = idx - currentIdx;
      const announceContent = getAnnounceContent(idx, liveDictionary || slideItems[idx]);
      this.currentIdx.set(current, idx);
      reOrdering(amount, slideItems, indicators);
      applyAnimate(slide, amount);
      if(announceContent) liveRegion.innerHTML = announceContent;
      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    getCurrIdx() {
      return this.currentIdx.get(current)
    }
  };

  return Carousel;
})();

export default Carousel;