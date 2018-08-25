define(['Views/View'], (View) => {
  const tag = '[DrawColorView]';
  const DrawColorView = Object.create(View);

  DrawColorView.setup = function (el) {
    if(!el) return this;
    this.init(el);
    return this;
  }

  DrawColorView.loadDefaultSketchs = function (design) {
    if (design === undefined || design === null || design > 1 ) return this;
    const imagePath = '/images/';
    const sketchPath = `ct${design + 1}_bg_0_0.svg`;
    const groupAPath = `ct${design + 1}_bg_0_1.svg`;
    const groupBPath = `ct${design + 1}_bg_0_2.svg`;
    const groupCPath = `ct${design + 1}_bg_0_3.svg`;

    this.el.querySelector('.canvas-layer.color-bg').removeAttribute('src');
    this.el.querySelector('.canvas-layer.color-groupa').removeAttribute('src');
    this.el.querySelector('.canvas-layer.color-groupb').removeAttribute('src');
    this.el.querySelector('.canvas-layer.color-groupc').removeAttribute('src');
    this.el.querySelector('.canvas-layer.sketch-bg').src = imagePath + sketchPath;
    this.el.querySelector('.canvas-layer.sketch-groupa').src = imagePath + groupAPath;
    this.el.querySelector('.canvas-layer.sketch-groupb').src = imagePath + groupBPath;
    this.el.querySelector('.canvas-layer.sketch-groupc').src = imagePath + groupCPath;

    this.bindChangeEvent(design);
    return this;
  }

  DrawColorView.setColorList = function (colorList) {
    if (colorList === undefined || colorList === null) return this;
    const bgColorLists = this.el.querySelectorAll('.bg-color-list [name="draw-bg"]');
    const groupAColorLists = this.el.querySelectorAll('.groupa-color-list [name="draw-groupa"]');
    const groupBColorLists = this.el.querySelectorAll('.groupb-color-list [name="draw-groupb"]');
    const groupCColorLists = this.el.querySelectorAll('.groupc-color-list [name="draw-groupc"]');

    axios({
      method: 'get',
      url: '/images/paint.svg',
      responseType: 'document'
    }).then((response) => {
      let docFrag = document.createDocumentFragment();
      docFrag.appendChild(response.data.firstElementChild);

      _.forEach(bgColorLists, (elem, idx) => {
        let colorPicker = elem.nextElementSibling;
        elem.checked = false;
        if(colorPicker.tagName && colorPicker.tagName.toLowerCase() === 'label') {
          colorPicker.classList.add(colorList['bg'][idx]['class']);
          colorPicker.setAttribute('aria-label', colorList['bg'][idx]['name']);
          colorPicker.removeChild(colorPicker.firstElementChild);
          colorPicker.appendChild(docFrag.cloneNode(true));
          colorPicker.firstElementChild.setAttribute('aria-hidden', 'true');
        }
      });

      _.forEach(groupAColorLists, (elem, idx) => {
        let colorPicker = elem.nextElementSibling;
        elem.checked = false;
        if(colorPicker.tagName && colorPicker.tagName.toLowerCase() === 'label') {
          colorPicker.classList.add(colorList['groupa'][idx]['class']);
          colorPicker.setAttribute('aria-label', colorList['groupa'][idx]['name']);
          colorPicker.removeChild(colorPicker.firstElementChild);
          colorPicker.appendChild(docFrag.cloneNode(true));
          colorPicker.firstElementChild.setAttribute('aria-hidden', 'true');
        }
      });

      _.forEach(groupBColorLists, (elem, idx) => {
        let colorPicker = elem.nextElementSibling;
        elem.checked = false;
        if(colorPicker.tagName && colorPicker.tagName.toLowerCase() === 'label') {
          colorPicker.classList.add(colorList['groupb'][idx]['class']);
          colorPicker.setAttribute('aria-label', colorList['groupb'][idx]['name']);
          colorPicker.removeChild(colorPicker.firstElementChild);
          colorPicker.appendChild(docFrag.cloneNode(true));
          colorPicker.firstElementChild.setAttribute('aria-hidden', 'true');
        }
      });

      _.forEach(groupCColorLists, (elem, idx) => {
        let colorPicker = elem.nextElementSibling;
        elem.checked = false;
        if(colorPicker.tagName && colorPicker.tagName.toLowerCase() === 'label') {
          colorPicker.classList.add(colorList['groupc'][idx]['class']);
          colorPicker.setAttribute('aria-label', colorList['groupc'][idx]['name']);
          colorPicker.removeChild(colorPicker.firstElementChild);
          colorPicker.appendChild(docFrag.cloneNode(true));
          colorPicker.firstElementChild.setAttribute('aria-hidden', 'true');
        }
      });
    });

    return this;
  }

  DrawColorView.bindChangeEvent = function (design) {
    this.el.addEventListener('change', (event) => {
      event = event || window.event;
      let el = event.target || event.srcElement;

      do {
        if (el.matches('input[type="radio"]')) {
          this.emit('@change', {
            target: el,
            design: design,
            category: el.getAttribute('name').replace(/draw-/g, ''),
            value: el.value
          });
        } else if (el === this.el) {
          break;
        }
      } while (el = el.parentElement);
    }, false);

    return this;
  }

  DrawColorView.onCheckColor = function (data) {
    if(!data || data.design === undefined) return;
    const design = data.design;
    const category = data.category;
    const value = data.value;

    const imagePath = '/images/';
    const bgImg = this.el.querySelector('.canvas-layer.color-bg');
    const groupaImg = this.el.querySelector('.canvas-layer.color-groupa');
    const groupbImg = this.el.querySelector('.canvas-layer.color-groupb');
    const groupcImg = this.el.querySelector('.canvas-layer.color-groupc');
    const sketchLayers = this.el.querySelectorAll('.canvas-layer[class*="sketch-"]');
    const allChecked = this.el.querySelectorAll('.coloring-accordion input[type="radio"]:checked').length === 4;

    switch (category) {
      case 'bg':
        bgImg.src = imagePath + `ct${Number(data.design) + 1}_bg_${Number(value) + 1}.svg`;
        break;
      case 'groupa':
        groupaImg.src = imagePath + `ct${Number(data.design) + 1}_1_${Number(value) + 1}.svg`;
        break;
      case 'groupb':
        groupbImg.src = imagePath + `ct${Number(data.design) + 1}_2_${Number(value) + 1}.svg`;
        break;
      case 'groupc':
        groupcImg.src = imagePath + `ct${Number(data.design) + 1}_3_${Number(value) + 1}.svg`;
        break;
    }

    if (allChecked === true) {
      _.forEach(sketchLayers, (el) => {
        el.classList.remove('dehighlight');
      });
    }

    return this;
  }

  DrawColorView.highlightLayer = function (data) {
    const activated = data.tab.getAttribute('id').replace(/^draw-|-legend$/g,'');
    const sketchLayers = this.el.querySelectorAll('.canvas-layer[class*="sketch-"]');
    const allChecked = this.el.querySelectorAll('.coloring-accordion input[type="radio"]:checked').length === 4;

    _.forEach(sketchLayers, (el) => {
      if(el.matches('.sketch-'+ activated))
        el.classList.remove('dehighlight');
      else
        if (!allChecked) el.classList.add('dehighlight');
    });

    return this;
  }

  DrawColorView.getDrawnColor = function () {
    const radios = this.el.querySelectorAll('.coloring-accordion input[type="radio"]:checked');
    let data = {};
    _.forEach(radios, (el) => {
      let prop = el.getAttribute('name').replace(/draw-/g, '');
      let value = el.value * 1 + 1;
      data[prop] = value;
    });
    return data;
  }

  DrawColorView.validate = function () {
    const bgChecked = this.el.querySelectorAll('.coloring-accordion input[name="draw-bg"]:checked').length;
    const groupAChecked = this.el.querySelectorAll('.coloring-accordion input[name="draw-groupa"]:checked').length;
    const groupBChecked = this.el.querySelectorAll('.coloring-accordion input[name="draw-groupb"]:checked').length;
    const groupCChecked = this.el.querySelectorAll('.coloring-accordion input[name="draw-groupc"]:checked').length;

    if (!bgChecked) {
      alert('배경색을 채워주세요.');
      return false;
    } else if (!groupAChecked) {
      alert('그룹A의 색을 채워주세요.');
      return false;
    } else if (!groupBChecked) {
      alert('그룹B의 색을 채워주세요.');
      return false;
    } else if (!groupCChecked) {
      alert('그룹C의 색을 채워주세요.');
      return false;
    }
    return true;
  }

  return DrawColorView;
});