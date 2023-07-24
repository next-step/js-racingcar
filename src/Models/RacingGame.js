import { Car } from './';
import { RACING_GAME, UTIL } from '../constants';
import { getRacingResult, getRandomIntInRange, Console } from '../utils';

export class RacingGame {
  #cars;
  #gameProgress;

  constructor(carNames, totalRounds) {
    this.#cars = [];
    this.#gameProgress = '\n실행 결과\n';
    this.#settingRacingGame(carNames, totalRounds);
  }

  #settingRacingGame(carNames, totalRounds) {
    for (let carName of carNames) this.#cars.push(new Car(carName));
    this.#raceWithTotalRounds(totalRounds);
  }

  #raceWithTotalRounds(totalRounds) {
    for (let round = 0; round < totalRounds; round++) {
      this.#cars.forEach((car) => this.#randomCarMovement(car));
      this.#recordGameProgress();
    }

    console.log('1');

    this.#printResult();
  }

  #randomCarMovement(car) {
    const randomInt = getRandomIntInRange(
      UTIL.RANDOM_INT_MIN,
      UTIL.RANDOM_INT_MAX
    );

    if (randomInt >= RACING_GAME.MOVEMENT_THRESHOLD) car.advance();
  }

  #recordGameProgress() {
    this.#cars.forEach((car) => {
      const carName = car.getName();
      const carDistance = car.getScore();
      const racingResult = getRacingResult(carName, carDistance);

      this.#gameProgress += `${racingResult}\n`;
    });

    this.#gameProgress += '\n';
  }

  #printResult() {
    Console.print(this.#gameProgress);
  }
}
