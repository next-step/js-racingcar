import CarService from '../services/car.service.js';

export default class CarController {
  #service;

  constructor() {
    this.#service = new CarService();
  }

  getOrigin() {
    return this.#service.getOrigin();
  }

  getName() {
    return this.#service.getName();
  }

  setName(carName) {
    this.#service.setName(carName);
    return this;
  }

  setMoveCount(count) {
    this.#service.setMoveCount(count);
    return this;
  }

  moveForward() {
    this.#service.increaseMoveCount();
    return this;
  }
}
