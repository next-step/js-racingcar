export default class BaseController {
  constructor(app) {
    this.model = app.model;
  }

  setState(key, payload) {
    this.model.setState(key, payload);
  }
}
