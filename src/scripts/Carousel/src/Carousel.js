const Carousel = (() => {
  let settings = {};
  let current = {current: `current`};

  const reOrdering = (nodes, amount) => {
    for(let i = -1, base = 2, order; ++i < nodes.length;) {
      order = (nodes[i].style.order || (base + i)) * 1 - amount;
      order = order < 1 ? nodes.length + order : order > nodes.length ? order - nodes.length : order;
      nodes[i].style.order = order;
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

  /**
   * Creates a Carousel
   * @class
   */
  class Carousel {
    constructor(options) {
      if(! options.root || !options.slide)
        throw new Error(`'root' or 'slide' is not defined`);

      const config = {
        ...options,
      };
      this.config = new WeakMap();
      this.currentIdx = new WeakMap([[current, 0]]);
      this.config.set(settings, config);

      this.init();
    }

    init() {
      const {
        slide,
        slideItems,
        prevBtn,
        nextBtn,
      } = this.config.get(settings);
      slide.classList.add(`is-set`);

      reOrdering(slideItems, 0);
      nextBtn.addEventListener('click', this.next.bind(this), false);
      prevBtn.addEventListener('click', this.prev.bind(this), false);
      emitEvent(slide, `init`, {currentIdx: this.currentIdx.get(current)});
    }

    next() {
      const {
        slide,
        slideItems,
      } = this.config.get(settings);
      let currIdx = this.currentIdx.get(current) + 1;
      currIdx = currIdx > slideItems.length - 1 ? 0 : currIdx;
      this.currentIdx.set(current, currIdx);
      reOrdering(slideItems, 1);
      applyAnimate(slide, 1);
      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    prev() {
      const {
        slide,
        slideItems,
      } = this.config.get(settings);
      let currIdx = this.currentIdx.get(current) - 1;
      currIdx = currIdx < 0 ? slideItems.length - 1 : currIdx;
      this.currentIdx.set(current, currIdx);
      reOrdering(slideItems, -1);
      applyAnimate(slide, -1);
      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    go(idx) {
      const {
        slide,
        slideItems,
      } = this.config.get(settings);
      const currentIdx = this.currentIdx.get(current);
      const amount = idx - currentIdx;
      this.currentIdx.set(current, idx);
      reOrdering(slideItems, amount);
      applyAnimate(slide, amount);
      emitEvent(slide, `changed`, {currentIdx: this.currentIdx.get(current)});
    }

    getCurrIdx() {
      return this.currentIdx.get(current)
    }
  };

  return Carousel;
})();

export default Carousel;