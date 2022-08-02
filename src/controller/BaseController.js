export default class BaseController {
  constructor(state) {
    this.state = state;

    BaseController.renderList.push(this.render.bind(this));
  }

  static renderList = [];

  static render() {
    BaseController.renderList.forEach(render => render());
  }

  setState(key, payload) {
    if (!Object.keys(this.state).find(_key => _key === key)) {
      throw Error(`state에 해당 ${key}의 값이 없습니다.`);
    }

    this.state[key] = payload;
    BaseController.render();
  }

  render() {}
}
