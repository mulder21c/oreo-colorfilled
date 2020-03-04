const Accordion = (() => {
  let settings = {};
  let current = {current: `current`};

  const activate = function(event) {
    const el = event.currentTarget;
    const {root, tabs, activeClass} = this.config.get(settings);
    const currActivatedEl = root.querySelector(`.${activeClass}`);
    if(el.classList.contains(activeClass)) return;
    if(currActivatedEl) {
      currActivatedEl.classList.remove(activeClass);
      currActivatedEl.nextElementSibling.hidden = true;
    }
    el.classList.add(activeClass);
    el.nextElementSibling.hidden = false;
    emitEvent(el, `selected`, {
      activatedIdx: Array.from(tabs).indexOf(el),
      activateEl: el,
    });
  };

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
      customEvent.initCustomEvent(event, false, false, params);
    }

    el.dispatchEvent(customEvent);
  }

  class Accordion {
    constructor(options) {
      if(! options.root)
        throw new Error(`'root' is not defined`);
      const config = {
        activeClass: `activated`,
        ...options,
      };
      this.config = new WeakMap();
      this.currentIdx = new WeakMap([[current, 0]]);
      this.config.set(settings, config);

      this.init();
    }

    init() {
      const {tabs, activeClass} = this.config.get(settings);
      for(let i = -1, tab; tab = tabs[++i];) {
        tab.addEventListener(`click`, activate.bind(this), false);
        if(i != 0) tab.nextElementSibling.hidden = true;
        else tab.classList.add(activeClass);
      }
      emitEvent(tabs[0], `selected`, {
        activatedIdx: 0,
        activateEl: tabs[0],
      });
    }
  }

  return Accordion;
})();


export default Accordion;