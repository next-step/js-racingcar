import { CARD_STATE } from '../constants/index.js';

const initState = {
  carBoard: [],
};

class Store {
  constructor() {
    this.state = { ...initState };
  }

  render() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    // TODO: STEP 모두완료 후 콘솔 제거
    console.log('this.state', this.state);
  }
}

export default Store;
