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
    useSRNotation: false,
    canClickIndicator: false,
    callback: null
  };

  let clickEvtDelegate;
  let keyEvtDelegate;

  function SliderView (settings) {
    this.init(settings);
    return this;
  }

  SliderView.prototype = {
    init (settings) {
      this.settings = _.extend({}, defaults, settings);

      if(!this.settings.el) throw new Error(tag, 'el is not defined or wrong!');
      this.el = document.querySelector(this.settings.el);
      if(!this.el) throw new Error(tag, 'the element is absent!', 'selector : ' + this.el);

      this.sliderWrapper = this.el.querySelector(this.settings.wrapperSelector);
      this.slideItems = this.el.querySelectorAll(this.settings.itemSelector);
      this.indicators = this.el.querySelectorAll(this.settings.indicatorSelector);
      this.controller = this.el.querySelector(this.settings.controllerSelector);
      this.srNotation = this.el.querySelector('.sr-notation');
      this.btnNext = this.el.querySelector(this.settings.btnNextSelector);
      this.btnPrev = this.el.querySelector(this.settings.btnPrevSelector);
      this.activeClass = this.settings.activeClass;
      this.animateId = null;

      if(!this.sliderWrapper)
        throw new Error(tag, 'The slider wrapper is absent!', 'selector : ' + this.settings.wrapperSelector);
      if(!this.slideItems|| !this.slideItems.length)
        throw new Error(tag, 'The slider Items is absent!', 'selector : ' + this.settings.itemSelector);
      if(this.settings.useIndicator && !this.indicators.length)
        throw new Error(tag, 'The indicators is absent!', 'selector : ' + this.settings.indicatorSelector);
      if(this.settings.useSRNotation && !this.srNotation)
        throw new Error(tag, 'The notation element for SR is absent!');
      if(!this.settings.useSRNotation && this.srNotation)
        this.srNotation.parentElement.removeChild(this.srNotation);

      if(this.settings.startIdx < 0 || this.settings.startIdx > this.slideItems.length - 1)
        throw new Error(tag, 'The Start Index must be in 0 ~ ' + this.slideItems.length);
      else
        this.activatedIdx = Number(this.settings.startIdx);

      if(this.settings.canClickIndicator)
        this.indicators[0].parentElement.classList.add('clickable-indicator');

      this.slideItemWidth = this.slideItems[0].clientWidth;

      this.bindClickEvent();
      this.bindKeyEvent();

      if(this.settings.callback){
        this.settings.callback = this.settings.callback.bind(this);
        this.el.addEventListener('animated', this.settings.callback, false);
      }

      this.goSlide(this.activatedIdx);

      return this;
    },
    destroy () {
      this.el.removeEventListener('click', keyEvtDelegate, false);
      this.el.removeEventListener('click', clickEvtDelegate, false);
      return this;
    },
    prevSlide () {
      this.btnNext.classList.remove('disable');
      if (--this.activatedIdx < 0) {
        this.activatedIdx = 0;
        return this;
      }
      this.slideItemWidth = this.slideItemWidth || this.slideItems[0].clientWidth;
      this.animateId = requestAnimationFrame(() => {
        this.animate(this.slideItemWidth * this.activatedIdx * -1);
        if (this.activatedIdx === 0)
          this.btnPrev.classList.add('disable');
        this.updateSRNotation(this.activatedIdx);
        this.updateSlideState(this.activatedIdx);
        this.updateIndicatorState(this.activatedIdx);
      });
      return this;
    },
    nextSlide () {
      this.btnPrev.classList.remove('disable');
      if(++this.activatedIdx > this.slideItems.length - 1){
        this.activatedIdx = this.slideItems.length - 1;
        return this;
      }
      this.slideItemWidth = this.slideItemWidth || this.slideItems[0].clientWidth;
      this.animateId = requestAnimationFrame(() => {
        this.animate(this.slideItemWidth * this.activatedIdx * -1);
        if (this.activatedIdx === this.slideItems.length - 1)
          this.btnNext.classList.add('disable');
        this.updateSRNotation(this.activatedIdx);
        this.updateSlideState(this.activatedIdx);
        this.updateIndicatorState(this.activatedIdx);
      });
      return this;
    },
    goSlide (idx) {
      if(idx > this.slideItems.length - 1 || idx < 0 ){
        return this;
      }
      this.btnPrev.classList.remove('disable');
      this.btnNext.classList.remove('disable');
      this.slideItemWidth = this.slideItemWidth || this.slideItems[0].clientWidth;
      this.animateId = requestAnimationFrame(() => {
        this.animate(this.slideItemWidth * idx * -1);
        this.updateSRNotation(idx);
        this.updateSlideState(idx);
        this.updateIndicatorState(idx);
        if (idx === 0)
          this.btnPrev.classList.add('disable');
        if (idx === this.slideItems.length - 1)
          this.btnNext.classList.add('disable');
        this.activatedIdx = idx;
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
      this.sliderWrapper.addEventListener('transitionend', () => {
        this.emit('animated');
      }, false);
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
    updateIndicatorState (newIdx) {
      _.forEach(this.indicators, (item, idx) => {
        if (idx !== newIdx){
          item.classList.remove(this.activeClass);
          item.removeAttribute('tabindex');
          item.setAttribute('aria-selected', 'false');
        } else {
          item.classList.add(this.activeClass);
          item.setAttribute('tabindex', '-1');
          item.focus();
          item.setAttribute('aria-selected', 'true');
        }
      });
    },
    bindKeyEvent () {
      keyEvtDelegate = (event) => {
        event = event || window.event;
        let el = event.target || event.srcElement;
        const keycode = event.keyCode || event.which;

        do {
          if (el === this.btnNext && keycode === 9 && !event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            if (this.settings.useIndicator)
              this.indicators[this.activatedIdx].focus();
            else
              this.slideItems[this.activatedIdx].focus();
          } else if (this.settings.useIndicator && el === this.indicators[0].parentElement) {
            switch (keycode) {
              case 9:
                event.preventDefault();
                event.stopPropagation();
                if (event.shiftKey)
                  this.btnNext.focus();
                else
                  this.slideItems[this.activatedIdx].focus();
                break;
              case 37:
                event.preventDefault();
                event.stopPropagation();
                this.prevSlide();
                break;
              case 39:
                event.preventDefault();
                event.stopPropagation();
                this.nextSlide();
                break;
            }
          } else if (el === this.sliderWrapper && keycode === 9 && event.shiftKey) {
            event.preventDefault();
            event.stopPropagation();
            if (this.settings.useIndicator)
              this.indicators[this.activatedIdx].focus();
            else
              this.btnNext.focus();
          } else if (el === this.el) {
            break;
          }
        } while (el = el.parentElement);
      };

      this.el.addEventListener('keydown', keyEvtDelegate, false);
      return this;
    },
    bindClickEvent () {
      clickEvtDelegate = (event) => {
        event = event || window.event;
        let el = event.target || event.srcElement;

        do {
          //console.log(el)
          if (this.settings.useController && el === this.btnNext) {
            this.nextSlide();
            break;
          } else if (this.settings.useController && el === this.btnPrev) {
            this.prevSlide();
            break;
          } else if (this.settings.canClickIndicator && el.matches(this.settings.indicatorSelector)) {
            let idx = _.indexOf(this.indicators, el);
            this.goSlide(idx);
            break;
          }

          else if (el === this.el) {
            break;
          }
        } while (el = el.parentElement);
      };

      this.el.addEventListener('click', clickEvtDelegate, false);
      return this;
    },
    emit (event) {
      let evt;

      if (typeof window.CustomEvent === 'function') {
        evt = new CustomEvent(event, {detail: {currIndex: this.activatedIdx}});
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, false, false, {detail: {currIndex: this.activatedIdx}});
      }

      this.el.dispatchEvent(evt);
      return this;
    }
  };

  return SliderView;
});