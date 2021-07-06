export default class State {
  #state;

  constructor(state) {
    this.#state = state;
  }

  get getState() {
    return this.#state;
  }

  set setNewState(newState) {
    this.#state = newState;
  }
}
