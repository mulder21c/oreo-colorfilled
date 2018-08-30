define(['Views/View'], (View) => {
  const tag = '[AwardOrderView]';
  const AwardOrderView = Object.create(View);

  AwardOrderView.setup = function (el) {
    if(!el) return this;
    this.init(el);
    new ClipboardJS(".btn-copy");
    return this;
  };

  AwardOrderView.startVideo = function () {
    const video = this.el.querySelector('video');
    if(!video) return this;

    video.play();
    return this;
  }

  AwardOrderView.stopVideo = function () {
    const video = this.el.querySelector('video');
    if(!video) return this;

    video.pause();
    video.currentTime = 0;
    return this;
  }

  AwardOrderView.getOreoCode = function (data) {
    const codeBox = this.el.querySelector('#oreo-code');
    axios({
      url: 'https://5b87bf0a35589600143c1458.mockapi.io/issue/', // mock API
      method: 'post',
      data: data
    }).then((response) => {
      const code = response.data.code;
      codeBox.value = code;
    });
  }

  return AwardOrderView;
});