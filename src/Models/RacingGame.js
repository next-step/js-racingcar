import { Car } from './';

export class RacingGame {
  #cars;

  constructor(carNames, totalRounds) {
    this.#cars = [];
    this.#settingRacingGame(carNames, totalRounds);
  }

  #settingRacingGame(carNames, totalRounds) {
    for (let carName of carNames) this.#cars.push(new Car(carName));
    this.#racing(totalRounds);
  }

  #racing(totalRounds) {
    for (let round = 0; i < totalRounds; i++);
  }
}
