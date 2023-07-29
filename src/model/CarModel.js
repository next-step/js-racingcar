import { SETTINGS } from '../constants/index.js';

class CarModel {
  name;
  position = 0;

  constructor(name) {
    this.name = name;
  }

  move() {
    this.position += SETTINGS.MOVEMENT;
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.name;
  }
}

export default CarModel;
