import { MAX_RANDOM_NUMBER, MIN_RANDOM_NUMBER } from "../const/RacingConfig";
import { getRandom } from "../common/Random";

export class Round {
  constructor(cars) {
    this.cars = cars;
  }

  play() {
    this.cars?.forEach((car) => {
      const random = getRandom(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);
      car.play(random);
    });
  }

  get winners() {
    const positions = this.cars.map((car) => car.position);
    const max = Math.max(...positions);

    return this.cars.filter((car) => car.position === max);
  }
}
