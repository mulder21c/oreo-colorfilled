define(() => {
  const tag = '[GlobalModel]';

  return {
    data: {
      page: 0,
      selectedDesign: null,
      selectedColor: []
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
      return this.selectedDesign;
    },
    getSelectedColor () {
      return this.selectedColor;
    },
    setSelectedDesign (design) {
      this.selectedDesign = design;
      return this;
    },
    setSelectedColor (colorList) {
      this.selectedColor = colorList;
      return this;
    }
  }
});