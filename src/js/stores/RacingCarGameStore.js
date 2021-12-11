import { createStore } from "./@common/store.js";

const initialState = {
  carNames: [],
  tryCount: 0,
};

const racingCarGameStore = createStore(initialState);

export default racingCarGameStore;
