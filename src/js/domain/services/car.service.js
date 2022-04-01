import CarModel from '../models/car.model.js';

export default class CarService {
  #car;

  constructor() {
    this.#car = CarModel();
  }

  getOrigin() {
    return this.#car;
  }

  getName() {
    return this.#car.name;
  }

  setName(name) {
    this.#car.name = name;
  }

  setMoveCount(count) {
    this.#car.moveCount = count;
  }

  increaseMoveCount() {
    this.#car.moveCount++;
  }
}
