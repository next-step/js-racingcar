import { Car } from './Car';
import { MESSAGE, RACING_GAME } from '../constants';
import {
  getRacingResult,
  getRandomCarMovementInt,
  findMaxDistance,
  findWinners,
  parseGameResult,
} from '../utils';

export class RacingGame {
  #cars = RACING_GAME.CARS.DEFAULT_STATE;
  #totalRound;
  #gameProgress = RACING_GAME.PROGRESS_TITLE;
  #gameResult;

  constructor(carNames, totalRound) {
    this.#cars = carNames.map((carName) => new Car(carName));
    this.#totalRound = totalRound;
  }

  startRace() {
    for (let round = 0; round < this.#totalRound; round++) {
      this.#cars.forEach((car) => {
        this.#randomCarMovement(car);
        this.#recordGameProgress(car);
      });

      this.#addNewLineToGameProgress();
    }

    this.#checkWinner();
  }

  #randomCarMovement(car) {
    const randomInt = getRandomCarMovementInt();

    if (RACING_GAME.CARS.MOVEMENT_THRESHOLD > randomInt) return;

    car.advance();
  }

  #recordGameProgress(car) {
    const carName = car.getName();
    const carDistance = car.getDistance();
    const racingResult = getRacingResult(carName, carDistance);

    this.#gameProgress += MESSAGE.ADD_NEW_LINE(racingResult);
  }

  #addNewLineToGameProgress() {
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
