import CarView from '../view/CarView.js';
import CarModel from '../model/CarModel.js';
import { SETTINGS } from '../constants/index.js';
import { getRandomNumber, validateName, terminal } from '../util/index.js';

export class RacingSystem {
  cars = [];
  round = 5;
  separator = ',';
  view;

  constructor(round, separator) {
    this.round = round;
    this.separator = separator;
    this.view = new CarView();
  }

  startGame(names) {
    const carNames = this.#validateName(names);
    this.cars = carNames.map((name) => new CarModel(name));
    this.view.printResultHeader();
    this.#runRaceLoop();
    this.#endGame();
  }

  #endGame() {
    const winners = this.#getWinners();
    this.view.printWinners(winners);
    terminal.close();
  }

  #validateName(input) {
    const carNames = input.split(this.separator).map((name) => validateName(name.trim()));
    return carNames;
  }

  #runRaceLoop() {
    for (let i = 0; i < this.round; i++) {
      this.#roundProcess();
      this.cars.forEach((car) => this.view.printCarPosition(car.getName(), car.getPosition()));
      this.view.printBreakLine();
    }
  }

  #roundProcess() {
    const { RANDOM_NUMBER, MOVEMENT_CONDITION } = SETTINGS;
    for (let i = 0; i < this.cars.length; i++) {
      if (getRandomNumber(RANDOM_NUMBER.MIN, RANDOM_NUMBER.MAX) >= MOVEMENT_CONDITION) {
        this.cars[i].move();
      }
    }
  }

  #getWinners() {
    const maxPosition = this.#getMaxPosition();
    const winners = this.cars.filter((car) => car.getPosition() === maxPosition);
    return winners.map((car) => car.getName());
  }

  #getMaxPosition() {
    return Math.max(...this.cars.map((car) => car.getPosition()));
  }
}
