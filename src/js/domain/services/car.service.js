import CarModel from '../models/car.model.js';

export default class CarService {
  #car;

  constructor() {
    this.#car = CarModel();
  }

  getName() {
    return this.#car.name;
  }

  getMoveCount() {
    return this.#car.moveCount;
  }

  setName(name) {
    this.#car.name = name;
  }

  initMoveCount() {
    this.#car.moveCount = 0;
  }

  increaseMoveCount() {
    this.#car.moveCount++;
  }
}
