const Accordion = (() => {
  let settings = {};
  let current = {current: `current`};

  const activate = function(event) {
    const el = event.currentTarget;
    const {
      root,
      tabs,
      activeClass,
    } = this.config.get(settings);
    const currActivatedEl = root.querySelector(`.${activeClass}`);
    const currIdx = Array.from(tabs).indexOf(el);

    if(el.classList.contains(activeClass)) return;
    if(currActivatedEl) {
      currActivatedEl.classList.remove(activeClass);
      currActivatedEl.setAttribute(`aria-expanded`, `false`);
      currActivatedEl.setAttribute(`aria-disabled`, `false`);
      currActivatedEl.nextElementSibling.hidden = true;
    }
    el.classList.add(activeClass);
    el.setAttribute(`aria-expanded`, `true`);
    el.setAttribute(`aria-disabled`, `true`);
    el.nextElementSibling.hidden = false;

    this.currentIdx.set(current, currIdx);
    emitEvent(el, `selected`, {
      activatedIdx: currIdx,
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
      customEvent.initCustomEvent(event, true, true, params.detail);
    }

    el.dispatchEvent(customEvent);
  }

  const bindHeaderKeyEvent = function(event) {
    const el = event.currentTarget;
    const keycode = event.keyCode || event.which;
    const {
      tabs,
    } = this.config.get(settings);
    let currIdx = this.currentIdx.get(current);
    let nextIdx;
    switch(keycode) {
      case 37:
      case 38:
        event.preventDefault();
        nextIdx = --currIdx < 0 ? tabs.length - 1 : currIdx;
        tabs[nextIdx].focus();
        this.currentIdx.set(current, nextIdx);
        break;
      case 39:
      case 40:
        event.preventDefault();
        nextIdx = ++currIdx > tabs.length - 1 ? 0 : currIdx;
        tabs[nextIdx].focus();
        this.currentIdx.set(current, nextIdx);
        break;
    }
  };

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
      const {
        tabs,
        panels,
        activeClass
      } = this.config.get(settings);
      for(let i = -1, tab, panel; tab = tabs[++i];) {
        panel = panels[i];
        panel.setAttribute(`role`, `group`);
        panel.setAttribute(`aria-describedby`, tab.id);
        tab.setAttribute(`aria-controls`, panel.id);

        if(i != 0) {
          tab.nextElementSibling.hidden = true;
          tab.setAttribute(`aria-expanded`, `false`);
          tab.setAttribute(`aria-disabled`, `false`);
        }
        else {
          tab.classList.add(activeClass);
          tab.setAttribute(`aria-expanded`, `true`);
          tab.setAttribute(`aria-disabled`, `true`);
        }

        tab.addEventListener(`click`, activate.bind(this), false);
        tab.addEventListener(`keydown`, bindHeaderKeyEvent.bind(this), false);
      }
      this.currentIdx.set(current, 0);
      emitEvent(tabs[0], `selected`, {
        activatedIdx: 0,
        activateEl: tabs[0],
      });
    }
  }

  return Accordion;
})();


export default Accordion;