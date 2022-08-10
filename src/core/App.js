export default class App {
  #defaultState; // BaseModel

  constructor(state) {
    this.state = { ...state }; // BaseModel
    this.#defaultState = state; // BaseModel
    this.renderList = []; // BaseModel
  }

  // BaseModel
  setState(key, payload) {
    if (!Object.keys(this.state).find(_key => _key === key)) {
      throw Error(`state에 해당 ${key}의 값이 없습니다.`);
    }

    this.state[key] = payload;
    this.render();
  }

  // BaseModel
  setRender(render) {
    this.renderList.push(render);
  }

  resetState() {
    this.state = { ...this.#defaultState };

    this.render();
  }

  // 해당 부분은 존재해야한다. 어느한군데서는 MVC를 관리하는 부분이 있어야하니...
  useController(Controller) {
    new Controller(this);
  }

  // BaseModel
  render() {
    this.renderList.forEach(render => render());
  }
}
