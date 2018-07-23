define(() => {
  const tag = '[SliderView]';

  const defaults = {
    el: null,
    wrapperSelector: '.slider-inner',
    itemSelector: '.slider-item',
    btnPrevSelector: '.btn-prev',
    btnNextSelector: '.btn-next',
    indicatorSelector: '.slider-indicator',
    animateDuration: 700,
    activeClass: 'active',
    startIdx: 0,
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
      settings = _.extend(defaults, settings);
      if(!settings.el) throw new Error(tag, 'el is not defined or wrong!');
      me.el = document.querySelector(settings.el);
      if(!me.el) throw new Error(tag, 'the element is absent!', 'selector : ' + me.el);

      me.sliderWrapper = me.el.querySelector(settings.wrapperSelector);
      me.slideItems = me.el.querySelectorAll(settings.itemSelector);
      me.indicator = me.el.querySelector(settings.indicatorSelector);
      me.srNotation = me.el.querySelector('.sr-notation');
      me.btnNext = me.el.querySelector(settings.btnNextSelector);
      me.btnPrev = me.el.querySelector(settings.btnPrevSelector);

      if(!me.sliderWrapper)
        throw new Error(tag, 'The slider wrapper is absent!', 'selector : ' + settings.wrapperSelector);
      if(!me.slideItems|| !me.slideItems.length)
        throw new Error(tag, 'The slider Items is absent!', 'selector : ' + settings.itemSelector);
      if(settings.useIndicator && !me.indicator)
        throw new Error(tag, 'The indicators is absent!', 'selector : ' + settings.indicatorSelector);
      if(settings.useSRNotation && !me.srNotation)
        throw new Error(tag, 'The notation element for SR is absent!');
      if(!settings.useSRNotation && me.srNotation)
        me.srNotation.parentElement.removeChild(me.srNotation);

      if(settings.startIdx < 0 || settings.startIdx > me.slideItems.length - 1)
        throw new Error(tag, 'The Start Index must be in 0 ~ ' + me.slideItems.length);
      else
        me.activatedIdx = Number(settings.startIdx);

      me.slideItemWidth = me.slideItems[0].clientWidth;

      me.nextSlide = me.nextSlide.bind(me);
      me.prevSlide = me.prevSlide.bind(me);
      if(me.btnNext) me.btnNext.addEventListener('click', me.nextSlide, false);
      if(me.btnPrev) me.btnPrev.addEventListener('click', me.prevSlide, false);

      me.animateId = null;

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
      el.textContent = `${idx + 1} / ${totalItems}`;
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
    }
  };

  return SliderView;
});