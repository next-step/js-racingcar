import CONSTANTS from '../constants/Constants.js';
import Random from '../utils/Random.js';
import Validator from './Validator.js';

class RacingGame {
  #cars;

  #round;

  #results;

  #winners;

  constructor(cars) {
    Validator.validateCarNames(cars);

    this.#cars = cars;
    this.#round = CONSTANTS.racingGame.initialRound;
    this.#results = [];
  }

  get cars() {
    return this.#cars;
  }

  get round() {
    return this.#round;
  }

  progressRound() {
    this.#cars.forEach(car => {
      RacingGame.moveCar(car, RacingGame.getRandomNumber());
    });

    this.setRoundResult();

    this.#round += 1;
  }

  setRoundResult() {
    const roundResult = this.#cars.map(car => ({
      name: car.name,
      position: car.position,
    }));

    this.#results = [...this.#results, roundResult];
  }

  setWinner() {
    const maxValue = Math.max(...this.#cars.map(car => car.position));

    this.#winners = this.#cars
      .filter(car => car.position === maxValue)
      .map(winner => winner.name);
  }

  startGame() {
    while (this.#round < CONSTANTS.racingGame.roundConfig) {
      this.progressRound();
    }

    this.setWinner();
  }

  getGameResult() {
    return {
      results: this.#results,
      winners: this.#winners,
    };
  }

  static moveCar(car, value) {
    if (value >= CONSTANTS.car.move.threshold) {
      car.move();
    }
  }

  static getRandomNumber() {
    const randomNumber = Random.generateRandomNumber(
      CONSTANTS.car.move.minNumber,
      CONSTANTS.car.move.maxNumber,
    );

    return randomNumber;
  }
}

export default RacingGame;
