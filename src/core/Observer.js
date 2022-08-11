export default class Observer {
  #listeners;

  constructor() {
    this.#listeners = [];
  }

  suscribe(render) {
    this.#listeners.push(render);
  }

  notify() {
    this.#listeners.forEach(listener => listener());
  }
}
