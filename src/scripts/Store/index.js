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
}

export default store;