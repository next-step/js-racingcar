export default class BaseController {
  constructor(app) {
    this.model = app.model;
    this.model.suscribe(this.render.bind(this)); // BaseView
  }

  setState(key, payload) {
    this.model.setState(key, payload);
  }

  render() {} // BaseView
}
