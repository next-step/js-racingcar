import Observer from '../observer.js';

class Controller extends Observer {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.subscribe(this.view.render.call(this.view, this.model, this.handlers));
  }

  handlers() {}
}

export default Controller;
