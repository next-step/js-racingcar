import Car from "./car";

export class Racing {
  #carList;
  #phase;

  constructor({ carList, phase = 5 }) {
    if (
      !Array.isArray(carList) ||
      !carList.every((car) => car instanceof Car)
    ) {
      throw new Error("Car 인스턴스 배열이여야 합니다.");
    }
    this.#carList = carList;

    if (!Number.isInteger(phase) || phase < 1) {
      throw new Error("자동차 경주는 1회 이상이어야 합니다.");
    }
    this.#phase = phase;
  }
}
