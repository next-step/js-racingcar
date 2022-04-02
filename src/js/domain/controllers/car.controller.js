import CarService from '../services/car.service.js';

export default class CarController {
  #service;

  constructor() {
    this.#service = new CarService();
  }

  getName() {
    return this.#service.getName();
  }

  getMoveCount() {
    return this.#service.getMoveCount();
  }

  setName(carName) {
    this.#service.setName(carName);
    return this;
  }

  initMoveCount() {
    this.#service.initMoveCount();
    return this;
  }

  moveForward() {
    this.#service.increaseMoveCount();
    return this;
  }
}
