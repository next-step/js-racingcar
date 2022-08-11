export default class BaseController {
  constructor(app) {
    this.app = app;
    this.app.model.suscribe(this.render.bind(this)); // BaseView
  }

  setState(key, payload) {
    this.app.model.setState(key, payload);
  }

  render() {} // BaseView
}
