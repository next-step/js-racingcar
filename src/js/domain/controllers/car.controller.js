import CarService from '../services/car.service.js';

export default class CarController {
  #service;

  constructor() {
    this.#service = new CarService();
  }

  setName(carName) {
    this.#service.setCarName(carName);
  }

  moveForward() {
    this.#service.increaseMoveCount();
  }
}
