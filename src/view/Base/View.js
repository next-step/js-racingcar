export default class BaseView {
  constructor(app) {
    this.controller = app.controller;
    this.model = app.model;

    if (this.render !== undefined) {
      this.model.suscribe(this.render.bind(this));
    }
  }
}
