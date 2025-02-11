import { CAR_RACE_CONFIG } from "./constants.js";

class Car {
  name;
  position = 0;

  constructor(name) {
    this.name = name;
  }

  move() {
    this.position += CAR_RACE_CONFIG.DISTANCE_PER_MOVE;
  }
}

export default Car;
