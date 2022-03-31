import CarModel from '../models/car.model.js';

export default class CarService {
  #car;

  constructor() {
    this.#car = CarModel;
  }

  getName() {
    return this.#car.name;
  }

  setCarName(carName) {
    this.#car.name = carName;
  }

  increaseMoveCount() {
    this.#car.moveCount++;
  }
}
