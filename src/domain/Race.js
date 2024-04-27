import Car from "./Car.js";
import { randomNumber } from "../utils/utils.js";

const MAX_ROUND = 5;
export default class Race {
  cars = [];
  maxRound;
  currentRound;

  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
    this.maxRound = MAX_ROUND;
    this.currentRound = 0;
  }

  play() {
    while (this.currentRound < this.maxRound) {
      this.cars.forEach((car) => car.move(randomNumber));
      this.currentRound++;
    }
  }
}
