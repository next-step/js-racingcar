import Car from "./car.js";
import { printCarStatus, printFinish, printResult } from "./output.js";

export class Racing {
  /** @type {Car[]} */
  #carList;
  #phase;

  constructor({ carList, phase = 5 }) {
    this.#validCarList(carList);
    this.#carList = carList;

    this.#validPhase(phase);
    this.#phase = phase;
  }

  run() {
    printResult();
    for (let cycle = 0; cycle < this.#phase; cycle++) {
      this.#carList.forEach((car) => {
        car.forward();
        printCarStatus(car.name);
      });
    }
    printFinish();
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
