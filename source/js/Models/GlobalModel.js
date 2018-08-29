define(() => {
  const tag = '[GlobalModel]';

  return {
    data: {
      page: 0,
      selectedDesign: null,
      selectedColor: {},
      msg: {}
    },
    getPage () {
      return this.data.page;
    },
    increasePage () {
      this.data.page++;
      return this;
    },
    decreasePage () {
      this.data.page--;
      return this;
    },
    getSelectedDesign () {
      return this.data.selectedDesign;
    },
    getSelectedColor () {
      return this.data.selectedColor;
    },
    getPostMessage () {
      return this.data.msg;
    },
    setSelectedDesign (design) {
      this.data.selectedDesign = design;
      return this;
    },
    setSelectedColor (colorList) {
      this.data.selectedColor = colorList;
      return this;
    },
    setPostMessage (msg) {
      this.data.msg = msg;
      return this;
    }
  }
});