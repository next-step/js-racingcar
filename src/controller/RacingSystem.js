import { RANDOM_NUMBER_MAX, RANDOM_NUMBER_MIN, SEPERATOR } from '../constants/settings.js';
import CarModel from '../model/CarModel.js';
import { getRandomNumber, trimString } from '../util/index.js';
import CarView from '../view/CarView.js';

export class RacingSystem {
  cars;
  winners;
  round;
  view;

  constructor() {
    this.view = new CarView();
  }

  #initializeGame(names, round) {
    this.cars = names.split(SEPERATOR).map((name) => new CarModel(trimString(name)));
    this.round = round;
  }

  startGame(names, round) {
    this.#initializeGame(names, round);

    this.#runGame();

    this.#endGame();
  }

  #runGame() {
    this.view.printResultHeader();
    Array(this.round)
      .fill()
      .forEach(() => {
        this.#runRoundProcess();
        this.view.printBreakLine();
      });
  }

  #runRoundProcess() {
    this.cars.forEach((car) => {
      car.move(getRandomNumber(RANDOM_NUMBER_MIN, RANDOM_NUMBER_MAX));
      this.view.printCarPosition(car.getName(), car.getPosition());
    });
  }

  #getWinners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.getPosition()));
    const winners = this.cars.filter((car) => car.getPosition() === maxPosition);
    return winners.map((winner) => winner.getName());
  }

  #endGame() {
    this.winners = this.#getWinners();
    this.view.printWinners(this.winners);
  }
}
