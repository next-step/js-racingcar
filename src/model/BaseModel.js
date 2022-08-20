import Observer from '../core/Observer.js';

export default class BaseModel extends Observer {
  #defaultState;

  constructor(state) {
    super();
    this.state = { ...state };
    this.#defaultState = state;
  }

  setState(key, payload) {
    if (!Object.keys(this.state).find(_key => _key === key)) {
      throw Error(`state에 해당 ${key}의 값이 없습니다.`);
    }

    this.state[key] = payload;
    this.notify();
  }

  resetState() {
    this.state = { ...this.#defaultState };
    this.notify();
  }
}
