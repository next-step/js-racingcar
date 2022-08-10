export default class BaseController {
  constructor(app) {
    this.app = app;
    this.app.setRender(this.render.bind(this)); // BaseView
  }

  setState(key, payload) {
    this.app.setState(key, payload);
  }

  render() {} // BaseView
}
