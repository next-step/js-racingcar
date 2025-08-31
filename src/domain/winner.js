import { Cars } from "./cars.js";

export class Winner {
  /** @type {Cars} */
  #cars;

  constructor({ cars }) {
    this.#cars = cars;
  }

  getCarNameList() {
    const maxPosition = Math.max(
      ...this.#cars.value.map((car) => car.position)
    );
    return this.#cars.value
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }
}
