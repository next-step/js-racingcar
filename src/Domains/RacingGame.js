import { Car } from './Car';
import { MESSAGE, RACING_GAME } from '../constants';
import {
  getRacingResult,
  getRandomIntToMovement,
  findMaxDistance,
  findWinners,
  parseGameResult,
} from '../utils';

export class RacingGame {
  #racers;
  #totalRound;
  #gameProgress = RACING_GAME.PROGRESS_TITLE;
  #gameResult;

  constructor(carNames, totalRound) {
    this.#racers = carNames.map((carName) => new Car(carName));
    this.#totalRound = totalRound;

    this.#startRace();
  }

  #startRace() {
    for (let round = 0; round < this.#totalRound; round++) {
      this.#racers.forEach((racer) => {
        this.#moveRacerByRandom(racer);
        this.#recordGameProgress(racer);
      });

      this.#addNewLineToGameProgress();
    }

    this.#checkWinner();
  }

  #moveRacerByRandom(racer) {
    const randomInt = getRandomIntToMovement();

    if (RACING_GAME.RACER.MOVEMENT_THRESHOLD > randomInt) return;

    racer.advance();
  }

  #recordGameProgress(racer) {
    const racerName = racer.getName();
    const racerDistance = racer.getDistance();
    const racingResult = getRacingResult(racerName, racerDistance);

    this.#gameProgress += MESSAGE.ADD_NEW_LINE(racingResult);
  }

  #addNewLineToGameProgress() {
    this.#gameProgress += MESSAGE.NEW_LINE;
  }

  #checkWinner() {
    const maxDistance = findMaxDistance(this.#racers);
    const winners = findWinners(this.#racers, maxDistance);

    this.#setGameResult(winners);
  }

  #setGameResult(winners) {
    this.#gameResult = parseGameResult(this.#gameProgress, winners);
  }

  getGameResult() {
    return this.#gameResult;
  }
}
