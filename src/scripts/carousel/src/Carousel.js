
const Carousel = (() => {
  let accessor = {};

  const reOrdering = (nodes, amount) => {
    for(let i = -1, base = 2, order; ++i < nodes.length;) {
      order = (nodes[i].style.order || (base + i)) * 1 - amount;
      order = order < 1 ? nodes.length : order > nodes.length ? 1 : order;
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

  /**
   * Creates a Carousel
   * @class
   */
  class Carousel {
    constructor(options) {
      if(! options.root || !options.slide)
        throw new Error(`'root' or 'slide' is not defined`);

      const config = {
        ...options
      };
      this.config = new WeakMap();
      this.config.set(accessor, config);

      this.init()
    }

    init() {
      const {slide, slideItems, prevBtn, nextBtn, } = this.config.get(accessor);
      slide.classList.add(`is-set`);
      reOrdering(slideItems, 0);
      nextBtn.addEventListener('click', this.next.bind(this), false);
      prevBtn.addEventListener('click', this.prev.bind(this), false);
    }

    next() {
      const {slide, slideItems} = this.config.get(accessor);
      reOrdering(slideItems, 1);
      applyAnimate(slide, 1);
    }

    prev() {
      const {slide, slideItems} = this.config.get(accessor);
      reOrdering(slideItems, -1);
      applyAnimate(slide, -1);
    }
  };

  return Carousel;
})();

export default Carousel;