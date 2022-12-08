import { GAME_CONDITION } from '../constants/condition.js';

import gameSetting from '../model/GameSetting.js';
import Car from '../model/Car.js';

import { generateRandomNumber } from '../utils/index.js';

class GameController {
  #cars = [];

  #trialCount = null;

  constructor(cars, trialCount) {
    this.#cars = cars;
    this.#trialCount = trialCount;
  }

  #isMovable(randomNumber) {
    return randomNumber >= GAME_CONDITION.MOVABLE_MIN_NUMBER;
  }

  getOneTurnResult() {
    const { MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER } = GAME_CONDITION;

    this.#cars.forEach((car) => {
      const randomNumber = generateRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER);

      if (this.#isMovable(randomNumber)) {
        car.move();
      }
    });
  }

  getTotalResult() {
    Array.from({ length: this.#trialCount }).forEach((_) => this.getOneTurnResult());
  }
}

export const startGame = () => {
  const carNames = gameSetting.getNames();
  const trialCount = gameSetting.getTrialCount();

  const cars = carNames.map((carName) => new Car(carName));
  const gameController = new GameController(cars, trialCount);

  gameController.getTotalResult();
};
