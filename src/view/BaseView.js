export default class BaseView {
  constructor(app) {
    if (this.render === undefined) {
      throw new TypeError('BaseController render must be overrided');
    }

    this.model = app.model;
    this.model.suscribe(this.render.bind(this));
  }
}
