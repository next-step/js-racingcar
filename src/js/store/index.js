const initState = {
  carBoard: [],
  winners: [],
};

class Store {
  constructor() {
    this.state = { ...initState };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    // TODO: STEP 모두완료 후 콘솔 제거
    console.log('this.state', this.state);
  }

  reset() {
    this.state = { ...initState };
  }
}

export default Store;
