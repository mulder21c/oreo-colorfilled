define(['Views/View'], (View) => {
  const tag = '[PageControlView]';

  const PageControlView = Object.create(View);
  let pageControls = [];

  PageControlView.setup = function (el) {
    if(!el) return;
    this.init(el);
    this.bindClickEvent();
    return this;
  }

  PageControlView.fetchControls = function (selector) {
    pageControls = this.el.querySelectorAll(selector);
    return this;
  }

  PageControlView.onChangePage = function (page) {
    _.forEach(pageControls, (controls, idx) => {
      if(idx === page){
        controls.removeAttribute('hidden');
        controls.setAttribute('aria-hidden', 'false');
      }else{
        controls.setAttribute('hidden', '');
        controls.setAttribute('aria-hidden', 'true');
      }
    });
    return this;
  }

  PageControlView.bindClickEvent = function () {
    this.el.addEventListener('click', (event) => {
      let btn = event.target || event.srcElement;
      if(btn.classList.contains('next-page'))
        this.nextPage();
      else if (btn.classList.contains('prev-page'))
        this.prevPage();
    });
    return this;
  };

  PageControlView.nextPage = function () {
    this.emit('@nextpage');
    return this;
  };

  PageControlView.prevPage = function () {
    this.emit('@prevpage');
    return this;
  };

  return PageControlView;
});