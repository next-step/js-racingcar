import {
  CAR_MOVE_CONDITION,
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
} from "../const/RacingConfig";
import { getRandom } from "../common/Random";

export class Round {
  cars;

  constructor(cars) {
    this.existsDuplicatedCarName(cars);
    this.cars = cars;
  }

  play() {
    this.cars.forEach((e) => {
      const random = getRandom(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
      if (this.isOkToMove(random)) {
        e.move();
      }
    });
  }

  isOkToMove(random) {
    if (random >= CAR_MOVE_CONDITION) {
      return true;
    }
    return false;
  }

  existsDuplicatedCarName(cars) {
    const carNames = cars.map((e) => e.name);

    if (carNames.length !== new Set(carNames).size) {
      throw new Error("중복된 이름의 자동차가 있습니다.");
    }
  }

  copy() {
    const copyCars = this.cars.map((e) => e.copy());
    const copy = new Round(copyCars);
    return copy;
  }

  get cars() {
    return [...this.cars];
  }

  get winners() {
    const positions = this.cars.map((car) => car.position);
    const max = Math.max(...positions);

    return this.cars.filter((car) => car.position === max);
  }
}
