define(['Views/View'], (View) => {
  const tag = '[WriteMessageView]';
  const WriteMessageView = Object.create(View);

  WriteMessageView.setup = function (el) {
    if(!el) return this;
    this.init(el);
    return this;
  }

  WriteMessageView.loadSvgs = function (design, colorList) {
    const imagePath = '/images/';
    const sketchPath = `ct${Number(design) + 1}_bg_0.svg`;
    const bgPath = `ct${Number(design) + 1}_bg_${colorList.bg}.svg`;
    const groupAPath = `ct${Number(design) + 1}_1_${colorList.groupa}.svg`;
    const groupBPath = `ct${Number(design) + 1}_2_${colorList.groupb}.svg`;
    const groupCPath = `ct${Number(design) + 1}_3_${colorList.groupc}.svg`;

    this.el.querySelector('.canvas-layer.sketch').src = imagePath + sketchPath;

    if(colorList && design <= 1) {
      this.el.querySelector('.canvas-layer.color-bg').src = imagePath + bgPath;
      this.el.querySelector('.canvas-layer.color-groupa').src = imagePath + groupAPath;
      this.el.querySelector('.canvas-layer.color-groupb').src = imagePath + groupBPath;
      this.el.querySelector('.canvas-layer.color-groupc').src = imagePath + groupCPath;
    }

    return this;
  }

  WriteMessageView.getMessage = function () {
    const msgTo = this.el.querySelector('#msg-to').value.trim();
    const msgBody = this.el.querySelector('#msg-body').value.trim();

    return {
      to: msgTo,
      body: msgBody
    };
  }

  return WriteMessageView;
});