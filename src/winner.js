import Car from "./car.js";
import { validCarList } from "./validation.js";

export class Winner {
  /** @type {Car[]} */
  #carList;

  constructor({ carList }) {
    validCarList(carList);
    this.#carList = carList;
  }

  getCarNameList() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    return this.#carList
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }
}
