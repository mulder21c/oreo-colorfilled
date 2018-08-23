define(['Views/View'], (View) => {
  const tag = 'PageView';
  const PageView = Object.create(View);

  let pages = [];

  PageView.setup = function (el) {
    if (!el) return;
    this.init(el);
    return this;
  }

  PageView.fetchPages = function (selector) {
    pages = this.el.querySelectorAll(selector);
    return this;
  }

  PageView.change = function (number) {
    if(number === 0){
      document.documentElement.classList.remove('sub');
      document.documentElement.classList.add('main');
    }else{
      document.documentElement.classList.remove('main');
      document.documentElement.classList.add('sub');
    }

    _.forEach(pages, (page, idx) => {
      if(idx === number){
        page.removeAttribute('hidden');
        page.setAttribute('aria-hidden', 'false');
      }else{
        page.setAttribute('hidden', '');
        page.setAttribute('aria-hidden', 'true');
      }
    });
  }

  return PageView;

});