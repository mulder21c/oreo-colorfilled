define(() => {
  const tag = '[SliderView]';

  const defaults = {
    el: null,
    wrapperSelector: '.slider-inner',
    itemSelector: '.slider-item',
    controllerSelector: '.slide-controller',
    btnPrevSelector: '.btn-prev',
    btnNextSelector: '.btn-next',
    indicatorSelector: '.slider-indicator',
    activeClass: 'active',
    startIdx: 0,
    useController: true,
    useIndicator: false,
    useSRNotation: false
  };

  function SliderView (settings) {
    this.init(settings);
    return this;
  }

  SliderView.prototype = {
    init (settings) {
      let me = this;
      me.settings = _.extend(defaults, settings);

      if(!me.settings.el) throw new Error(tag, 'el is not defined or wrong!');
      me.el = document.querySelector(me.settings.el);
      if(!me.el) throw new Error(tag, 'the element is absent!', 'selector : ' + me.el);

      me.sliderWrapper = me.el.querySelector(me.settings.wrapperSelector);
      me.slideItems = me.el.querySelectorAll(me.settings.itemSelector);
      me.indicators = me.el.querySelector(me.settings.indicatorSelector);
      me.controller = me.el.querySelector(me.settings.controllerSelector);
      me.srNotation = me.el.querySelector('.sr-notation');
      me.btnNext = me.el.querySelector(me.settings.btnNextSelector);
      me.btnPrev = me.el.querySelector(me.settings.btnPrevSelector);
      me.animateId = null;
      me.lastControlEl = me.settings.useController ? me.useIndicator ? me.indicators[me.indicators.length - 1] : me.btnNext : null;

      if(!me.sliderWrapper)
        throw new Error(tag, 'The slider wrapper is absent!', 'selector : ' + me.settings.wrapperSelector);
      if(!me.slideItems|| !me.slideItems.length)
        throw new Error(tag, 'The slider Items is absent!', 'selector : ' + me.settings.itemSelector);
      if(me.settings.useIndicator && !me.indicators.length)
        throw new Error(tag, 'The indicators is absent!', 'selector : ' + me.settings.indicatorSelector);
      if(me.settings.useSRNotation && !me.srNotation)
        throw new Error(tag, 'The notation element for SR is absent!');
      if(!me.settings.useSRNotation && me.srNotation)
        me.srNotation.parentElement.removeChild(me.srNotation);

      if(me.settings.startIdx < 0 || me.settings.startIdx > me.slideItems.length - 1)
        throw new Error(tag, 'The Start Index must be in 0 ~ ' + me.slideItems.length);
      else
        me.activatedIdx = Number(me.settings.startIdx);

      me.slideItemWidth = me.slideItems[0].clientWidth;

      if(me.settings.useController) {
        me.nextSlide = me.nextSlide.bind(me);
        me.prevSlide = me.prevSlide.bind(me);
        if(me.btnNext) me.btnNext.addEventListener('click', me.nextSlide, false);
        if(me.btnPrev) me.btnPrev.addEventListener('click', me.prevSlide, false);
      }

      me.bindKeyEvent();
      me.goSlide(me.activatedIdx);
      return me;
    },
    destroy () {
      console.log('destroy')
      return this;
    },
    prevSlide () {
      let me = this;
      me.btnNext.classList.remove('disable');
      if (--me.activatedIdx < 0) {
        me.activatedIdx = 0;
        return me;
      }
      me.animateId = requestAnimationFrame(() => {
        me.animate(me.slideItemWidth * me.activatedIdx * -1);
        me.updateSRNotation(me.activatedIdx);
        me.updateSlideState(me.activatedIdx);
        if (me.activatedIdx === 0)
          me.btnPrev.classList.add('disable');
      });
      return me;
    },
    nextSlide () {
      let me = this;
      me.btnPrev.classList.remove('disable');
      if(++me.activatedIdx > me.slideItems.length - 1){
        me.activatedIdx = me.slideItems.length - 1;
        return me;
      }
      me.animateId = requestAnimationFrame(() => {
        me.animate(me.slideItemWidth * me.activatedIdx * -1);
        me.updateSRNotation(me.activatedIdx);
        me.updateSlideState(me.activatedIdx);
        if (me.activatedIdx === me.slideItems.length - 1)
          me.btnNext.classList.add('disable');
      });
      return me;
    },
    goSlide (idx) {
      let me = this;
      if(idx > me.slideItems.length - 1 || idx < 0 ){
        return me;
      }
      me.btnPrev.classList.remove('disable');
      me.btnNext.classList.remove('disable');
      me.animateId = requestAnimationFrame(() => {
        me.animate(me.slideItemWidth * idx * -1);
        me.updateSRNotation(idx);
        me.updateSlideState(idx);
        if (idx === 0)
          me.btnPrev.classList.add('disable');
        if (idx === me.slideItems.length - 1)
          me.btnNext.classList.add('disable');
      });
      return this;
    },
    animate (amount) {
      cancelAnimationFrame(this.animateId);
      this.sliderWrapper.style.msTransform = 'translate(' + amount + 'px, 0)';
      this.sliderWrapper.style.MozTransform = 'translate(' + amount + 'px, 0)';
      this.sliderWrapper.style.OTransform = 'translate(' + amount + 'px, 0)';
      this.sliderWrapper.style.WebkitTransform = 'translate(' + amount + 'px, 0)';
      this.sliderWrapper.style.transform = 'translate(' + amount + 'px, 0)';
    },
    getActivatedIdx () {
      return this.activatedIdx;
    },
    updateSRNotation (idx) {
      if (!this.srNotation) return this;
      let totalItems = this.slideItems.length;
      let el = document.createElement('div');
      el.textContent = `${idx + 1} / ${totalItems} Slide`;
      if(this.srNotation.firstElementChild)
        this.srNotation.removeChild(this.srNotation.firstElementChild);
      this.srNotation.appendChild(el);
    },
    updateSlideState (newIdx) {
      _.forEach(this.slideItems, (item, idx) => {
        if (idx !== newIdx){
          item.setAttribute('aria-hidden', 'true');
          item.removeAttribute('tabindex');
        } else {
          item.setAttribute('aria-hidden', 'false');
          item.setAttribute('tabindex', '-1');
        }
      });
    },
    bindKeyEvent () {
      const focusToPannel = ((event) => {
        event = event || window.event;
        const el = event.currentTarget;
        const keycode = event.keyCode || event.which;

        if(keycode === 9 & !event.shiftKey) {
          event.preventDefault();
          this.slideItems[this.activatedIdx].focus();
        }
      });

      const triggingController = ((event) => {
        event = event || window.event;
        const el = event.currentTarget;
        const keycode = event.keyCode || event.which;

        switch (keycode) {
          case 37:
            event.preventDefault();
            this.prevSlide();
            break;
          case 39:
            event.preventDefault();
            this.nextSlide();
            break;
        }
      });

      this.controller.addEventListener('keydown', triggingController, false);
      if (this.lastControlEl)
        this.lastControlEl.addEventListener('keydown', focusToPannel , false);
      return this;
    }
  };

  return SliderView;
});