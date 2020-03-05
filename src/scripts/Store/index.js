let data = JSON.parse(sessionStorage.getItem(`customed-oreo`)) || {};

const updateStore = data => {
  sessionStorage.setItem(`customed-oreo`, JSON.stringify(data));
}

const store = {
  clear() {
    sessionStorage.removeItem(`customed-oreo`);
  },
  getData() {
    return data;
  },
  setSelectedDesign(design) {
    data = {...data, design};
    updateStore(data);
    return data;
  },
  setSelectedColor(colors) {
    data = {...data, colors};
    updateStore(data);
    return data;
  },
  setMesssage(message) {
    data = {...data, message};
    updateStore(data);
    return data;
  },
  resetSelectedItems(items) {
    for(let item of items) {
      delete data[item];
    }
    updateStore(data);
    return data;
  }
}

export default store;