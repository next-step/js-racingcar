import { Car } from './';
import { MESSAGE, RACING_GAME, UTIL } from '../constants';
import {
  getRacingResult,
  getRandomCarMovementInt,
  findMaxDistance,
  findWinners,
  parseGameResult,
} from '../utils';

export class RacingGame {
  #cars = [];
  #gameProgress = RACING_GAME.PROGRESS_TITLE;
  #gameResult;

  constructor() {}

  settingRacingGame(carNames, totalRounds) {
    this.#cars = carNames.map((carName) => new Car(carName));
    this.#raceWithTotalRounds(totalRounds);
  }

  #raceWithTotalRounds(totalRounds) {
    for (let round = 0; round < totalRounds; round++) {
      this.#cars.forEach(this.#randomCarMovement);
      this.#recordGameProgress();
    }

    this.#checkWinner();
  }

  #randomCarMovement(car) {
    const randomInt = getRandomCarMovementInt();

    if (RACING_GAME.MOVEMENT_THRESHOLD > randomInt) return;

    car.advance();
  }

  #recordGameProgress() {
    this.#cars.forEach((car) => {
      const carName = car.getName();
      const carDistance = car.getDistance();
      const racingResult = getRacingResult(carName, carDistance);

      this.#gameProgress += MESSAGE.ADD_NEW_LINE(racingResult);
    });

    this.#gameProgress += MESSAGE.NEW_LINE;
  }

  #checkWinner() {
    const maxDistance = findMaxDistance(this.#cars);
    const winners = findWinners(this.#cars, maxDistance);

    this.#setGameResult(winners);
  }

  #setGameResult(winners) {
    this.#gameResult = parseGameResult(this.#gameProgress, winners);
  }

  getGameResult() {
    return this.#gameResult;
  }
}
