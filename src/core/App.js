export default class App {
  #defaultState;

  constructor(state) {
    this.state = { ...state };
    this.#defaultState = state;
    this.renderList = [];
  }

  setState(key, payload) {
    if (!Object.keys(this.state).find(_key => _key === key)) {
      throw Error(`state에 해당 ${key}의 값이 없습니다.`);
    }

    this.state[key] = payload;
    this.render();
  }

  setRender(render) {
    this.renderList.push(render);
  }

  resetState() {
    this.state = { ...this.#defaultState };

    this.render();
  }

  useController(Controller) {
    new Controller(this);
  }

  render() {
    this.renderList.forEach(render => render());
  }
}
