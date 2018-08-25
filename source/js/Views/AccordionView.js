define(() => {
  const tag = '[AccordionView]';
  const defaults = {
    el: null,
    tabSelector: '.tab',
    activeClass: 'active',
    startIdx: 0
  };

  function AccordionView (settings) {
    this.init(settings);
    return this;
  }

  AccordionView.prototype = {
    init (settings) {
      this.settings = _.extend({}, defaults, settings);
      if(!this.settings.el) throw new Error(tag, 'el is not defined or wrong!');
      this.el = document.querySelector(this.settings.el);
      if(!this.el) throw new Error(tag, 'the element is absent!', `selector : ${this.settings.el}`);

      this.tabs = this.el.querySelectorAll(this.settings.tabSelector);
      if(!this.tabs || !this.tabs.length) throw new Error(tag, 'the accordion tab is absent!', `selector : ${this.settings.tabSelector}`);

      this.activate(this.tabs[this.settings.startIdx]);
      this.bindClickEvent();
      this.bindKeyEvent();
    },
    bindKeyEvent () {
      const keyEvtDelegate = (event) => {
        event = event || window.event;
        let keycode = event.keyCode || event.which;
        let el = event.target || event.srcElement;

        do {
          if (el.matches(this.settings.tabSelector)) {
            switch (keycode) {
              case 13:
              case 32:
                event.preventDefault();
                event.stopPropagation();
                this.activate(el);
                break;
              case 38: //up arrow
                event.preventDefault();
                event.stopPropagation();
                let prevIdx = _.indexOf(this.tabs, el) - 1;
                prevIdx = prevIdx < 0 ? this.tabs.length - 1 : prevIdx;
                this.tabs[prevIdx].focus();
                break;
              case 40: //down arrow
                event.preventDefault();
                event.stopPropagation();
                let nextIdx = _.indexOf(this.tabs, el) + 1;
                nextIdx = nextIdx > this.tabs.length - 1 ? 0 : nextIdx;
                this.tabs[nextIdx].focus();
                break;
              case 36: //home
                event.preventDefault();
                event.stopPropagation();
                this.tabs[0].focus();
                break;
              case 35: //end
                event.preventDefault();
                event.stopPropagation();
                this.tabs[this.tabs.length - 1].focus();
                break;
              default:
                break;
            }
          } else if (el === this.el) {
            break;
          }
        } while (el = el.parentElement);
      }

      this.el.addEventListener('keydown', keyEvtDelegate, false);
      return this;
    },
    bindClickEvent () {
      const clickEvtDelegate = (event) => {
        event = event || window.event;
        let el = event.target || event.srcElement;
        do {
          if (el.matches(this.settings.tabSelector)) {
            event.preventDefault();
            event.stopPropagation();
            this.activate(el);
            break;
          } else if (el === this.el) {
            break;
          }
        } while (el = el.parentElement);
      };

      this.el.addEventListener('click', clickEvtDelegate, false);
      return this;
    },
    activate (tab) {
      const currOpenTab = _.find(this.tabs, (elem) => {return elem.parentElement.classList.contains(this.settings.activeClass)});
      const currOpenPanel = this.el.querySelector(`#${currOpenTab.getAttribute('aria-controls')}`);
      const tabPanel = this.el.querySelector(`#${tab.getAttribute('aria-controls')}`);
      if (tab === currOpenTab) return this;

      currOpenTab.setAttribute('aria-expanded', 'false');
      currOpenTab.setAttribute('aria-disabled', 'false');
      currOpenTab.parentElement.classList.remove(this.settings.activeClass);
      currOpenPanel.setAttribute('hidden', '');

      tab.parentElement.classList.add(this.settings.activeClass);
      tabPanel.removeAttribute('hidden');
      tab.setAttribute('aria-disabled', 'true');
      tab.setAttribute('aria-expanded', 'true');

      this.emit('@activated', {tab: tab, panel: tabPanel});
    },
    emit (event, data = null) {
      let evt;

      if (typeof window.CustomEvent === 'function') {
        evt = new CustomEvent(event, {detail: data});
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, false, false, {detail: data});
      }

      this.el.dispatchEvent(evt);
      return this;
    },
    on (event, handler, useCapture = false) {
      this.el.addEventListener(event, handler, useCapture);
      return this;
    }
  };

  return AccordionView;
});