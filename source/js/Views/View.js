define(() => {
  const tag = '[View]';

  const exports = {
    init (el) {
      if(!el) throw new Error('View couldn\'t be initialized');
      this.el = el;
      return this;
    },
    on (event, handler, useCapture = false) {
      this.el.addEventListener(event, handler, useCapture);
      return this;
    },
    emit (event, data) {
      let evt;

      if(typeof window.CustomEvent === 'function'){
        evt = new CustomEvent(event, {detail: data});
      }else{
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, false, false, {detail: data});
      }
      this.el.dispatchEvent(evt);
      return this;
    },
    hide () {
      this.el.hidden = true;
      this.el.setAttribute('aria-hidden', 'true');
    },
    show () {
      this.el.hidden = false;
      this.el.setAttribute('aria-hidden', 'false');
    }
  };

  return exports;
});