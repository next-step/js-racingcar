import { MOVEMENT, MOVEMENT_CONDITION } from '../constants/settings.js';

class CarModel {
  name;
  position = 0;

  constructor(name) {
    this.name = name;
  }

  move(randomNumber) {
    if (randomNumber >= MOVEMENT_CONDITION) {
      this.position += MOVEMENT;
    }
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.name;
  }
}

export default CarModel;
