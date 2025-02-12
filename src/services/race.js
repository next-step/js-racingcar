import { ROUNDS } from "../constants/index.js";
import Car from "../models/car.js";

export default class Race {
  constructor(name) {
    this.car = new Car(name);
  }

  start() {
    for (let i = 0; i < ROUNDS; i++) {
      this.car.move();
      console.log(this.car.getStatus());
    }
  }
}
