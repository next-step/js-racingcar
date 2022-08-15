export default class App {
  constructor(model) {
    this.model = model;
    this.controller = {};
  }

  useController(Controller) {
    const instance = new Controller(this);
    this.controller[instance.name] = instance;
  }

  useView(View) {
    new View(this);
  }
}
