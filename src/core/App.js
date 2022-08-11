export default class App {
  constructor(model) {
    this.model = model;
  }

  useController(Controller) {
    // if ! Controller  instanceof BaseController throw error
    new Controller(this);
  }

  useView(View) {
    // if ! View  instanceof BaseView throw error
    new View(this);
  }
}
