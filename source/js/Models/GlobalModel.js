define(() => {
  const tag = '[GlobalModel]';

  return {
    data: {
      page: 0
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
    }
  }
});