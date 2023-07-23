class Car {
  #name;
  #distanceDriven = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getDistanceDriven() {
    return this.#distanceDriven;
  }

  moveForward() {
    this.#distanceDriven = this.#distanceDriven + 1;
  }
}

export default Car;
