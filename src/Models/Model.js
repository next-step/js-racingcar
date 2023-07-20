export class Model {
  #car;

  constructor(car) {
    this.#car = car();
  }
}
