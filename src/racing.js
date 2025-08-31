import Car from "./car.js";

export class Racing {
  /** @type {Car[]} */
  #carList;
  get carList() {
    return this.#carList;
  }
  #phase;
  get phase() {
    return this.#phase;
  }
  /** @type {Map<Car, number[]>} */
  #history;
  get history() {
    return this.#history;
  }

  constructor({ carList, phase = 5 }) {
    this.#validCarList(carList);
    this.#carList = carList;

    this.#validPhase(phase);
    this.#phase = phase;

    this.#history = new Map();
    this.#carList.forEach((car) => {
      this.#history.set(car, []);
    });
  }

  run() {
    for (let cycle = 0; cycle < this.#phase; cycle++) {
      this.#carList.forEach((car) => {
        car.forward(Math.floor(Math.random() * 10));
        const positionHistory = this.#history.get(car);
        this.#history.set(car, [...positionHistory, car.position]);
      });
    }
  }

  #validCarList(carList) {
    if (
      !Array.isArray(carList) ||
      !carList.every((car) => car instanceof Car)
    ) {
      throw new Error("Car 인스턴스 배열이여야 합니다.");
    }
  }

  #validPhase(phase) {
    if (!Number.isInteger(phase) || phase < 1) {
      throw new Error("자동차 경주는 1회 이상이어야 합니다.");
    }
  }
}
