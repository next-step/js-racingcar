import CarModel from '../model/CarModel.js';
import { WinnerModel } from '../model/WinnerModel.js';
import { getRandomNumber } from '../util/index.js';
import CarView from '../view/CarView.js';
import { Validator } from './Validator.js';

export class RacingSystem {
  cars;
  winners;
  #settings;
  #view;
  #validator;

  constructor(GameSettings) {
    this.#settings = GameSettings;
    this.view = new CarView();
    this.#validator = new Validator();
  }

  #initializeGame(names) {
    this.cars = names.split(this.#settings.seperator).map((name) => {
      this.#validator.validateConditions(name.trim());
      return new CarModel(name.trim());
    });
  }

  startGame(names) {
    this.#initializeGame(names.trim());

    this.#runGame();

    this.#endGame();
  }

  #runGame() {
    this.view.printResultHeader();
    for (let i = 0; i < this.#settings.round; i++) {
      this.#runRoundProcess();
      this.view.printBreakLine();
    }
  }

  #runRoundProcess() {
    const { randomNumberMax, randomNumberMin, movementCondition } = this.#settings.getSettings();
    this.cars.forEach((car) => {
      if (getRandomNumber(randomNumberMax, randomNumberMin) >= movementCondition) {
        car.move();
      }
      this.view.printCarPosition(car.getName(), car.getPosition());
    });
  }

  #endGame() {
    this.winners = new WinnerModel(this.cars).winners;
    this.view.printWinners(this.winners);
  }
}
