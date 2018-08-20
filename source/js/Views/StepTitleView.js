define(['Views/View'], (View) => {
  const tag = '[StepTitleView]';
  const StepTitleView = Object.create(View);

  StepTitleView.setup = function (el) {
    if(!el) return this;
    this.init(el);
    return this;
  }

  StepTitleView.setTitle = function (txt) {
    if(!this.el) return this;
    if(this.el.textContent){
      this.el.textContent = txt;
    }else{
      this.el.innerText = txt;
    }
    return this;
  }

  return StepTitleView;
});
