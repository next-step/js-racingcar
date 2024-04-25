import { MAX_RANDOM_NUMBER, MIN_RANDOM_NUMBER } from "../const/RacingConfig";
import { getRandom } from "../common/Random";

export class Round {
  cars;

  constructor(cars) {
    this.cars = cars;
  }

  play() {
    const copyCars = this.cars.map((e) => e.copy());

    copyCars.forEach((e) => {
      const random = getRandom(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
      e.play(random);
    });

    this.cars = copyCars;
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
