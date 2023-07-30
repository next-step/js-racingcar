export class Car {
  #carName = '';
  #distance = 0;

  constructor(carName) {
    this.#carName = carName;
  }

  get carName() {
    return this.#carName;
  }

  get distance() {
    return this.#distance;
  }

  move = () => {
    this.#distance += 1;
  };
}
