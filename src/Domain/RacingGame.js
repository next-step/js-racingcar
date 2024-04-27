import CONSTANTS from '../constants/Constants.js';
import Validator from '../utils/Validator.js';

class RacingGame {
  #cars;

  #round;

  #results;

  #winners;

  constructor(cars) {
    Validator.validateInputData(cars);

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
    this.#cars.forEach(car => car.move());

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
}

export default RacingGame;
