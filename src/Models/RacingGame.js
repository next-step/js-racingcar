import { Car } from './';
import { RACING_GAME } from '../constants';
import { getRandomIntInRange } from '../utils';

export class RacingGame {
  #cars;

  constructor(carNames, totalRounds) {
    this.#cars = [];
    this.#settingRacingGame(carNames, totalRounds);
  }

  #settingRacingGame(carNames, totalRounds) {
    for (let carName of carNames) this.#cars.push(new Car(carName));
    this.#raceWithTotalRounds(totalRounds);
  }

  #raceWithTotalRounds(totalRounds) {
    for (let round = 0; round < totalRounds; round++) {
      this.#cars.forEach((car) => this.#randomCarMovement(car));
    }
  }

  #randomCarMovement(car) {
    const randomInt = getRandomIntInRange(
      UTIL.RANDOM_INT_MIN,
      UTIL.RANDOM_INT_MAX
    );

    if (randomInt >= RACING_GAME.MOVEMENT_THRESHOLD) car.advance();
  }
}
