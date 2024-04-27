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

  get winners() {
    return this.#winners;
  }

  get results() {
    return this.#results;
  }

  progressRound() {
    this.#cars.forEach(car => car.move());

    this.saveRoundResult();

    this.#round += 1;
  }

  saveRoundResult() {
    const roundResult = this.#cars.map(car => ({
      name: car.name,
      position: car.position,
    }));

    this.#results = [...this.#results, roundResult];
  }

  setWinner() {
    const maxValue = Math.max(...this.#cars.map(car => car.position));

    this.#winners = this.#cars.filter(car => car.position === maxValue);
  }

  startGame() {
    while (this.#round < CONSTANTS.racingGame.roundConfig) {
      this.progressRound();
    }

    this.setWinner();
  }
}

export default RacingGame;
