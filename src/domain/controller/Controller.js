import {Car} from '../model/Car';

export class Controller {
  static FORWARD_THRESHOLD = 4;

  #cars = [];
  #currentRaceNumber = 0;

  get currentRaceNumber() {
    return this.#currentRaceNumber;
  }

  createCars = carNames => {
    this.#cars = carNames.map(carName => new Car(carName));
  };

  getCarsDistance = () => {
    return this.#cars.map(car => ({carName: car.carName, distance: car.distance}));
  };

  getMaximumDistanceCars = cars => {
    const maximumDistance = Math.max(...cars.map(car => car.distance));
    return cars.filter(car => car.distance === maximumDistance);
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
}
