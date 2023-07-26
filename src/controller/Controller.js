import {Car} from '../model/Car';

export class Controller {
  static MAXIMUM_CAR_NAME_LENGTH = 5;
  static FORWARD_THRESHOLD = 4;
  #cars = [];
  #currentRaceNumber = 0;

  get currentRaceNumber() {
    return this.#currentRaceNumber;
  }

  createCars = carNames => {
    this.#cars = carNames.map(carName => new Car(carName));
  };

  race = () => {
    this.#currentRaceNumber += 1;
    this.#cars.forEach(car => {
      if (this.canForward()) {
        car.move();
      }
    });
  };

  canForward = () => {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber >= Controller.FORWARD_THRESHOLD;
  };

  isValidCarNames = carNames => {
    return carNames.every(carName => carName.length <= Controller.MAXIMUM_CAR_NAME_LENGTH);
  };
}
