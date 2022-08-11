export default class BaseView {
  constructor(app) {
    this.model = app.model;
    this.model.suscribe(this.render.bind(this));
  }

  render() {} // BaseView
}
