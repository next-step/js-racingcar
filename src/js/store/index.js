const initState = {
  carNames: null,
};

class Store {
  constructor() {
    this.state = { ...initState };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    console.log('this.state', this.state);
  }
}

export default Store;
