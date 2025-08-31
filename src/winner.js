import Car from "./car.js";

export class Winner {
  /** @type {Car[]} */
  #carList;

  constructor({ carList }) {
    this.#validCarList(carList);
    this.#carList = carList;
  }

  getCarNameList() {
    const maxPosition = Math.max(...this.#carList.map((car) => car.position));
    return this.#carList
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }

  #validCarList(carList) {
    if (
      !Array.isArray(carList) ||
      !carList.every((car) => car instanceof Car)
    ) {
      throw new Error("Car 인스턴스 배열이여야 합니다.");
    }
  }
}
