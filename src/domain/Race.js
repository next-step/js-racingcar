import Car from "./Car.js";
import { getRandomNumber } from "../utils/utils.js";

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

  playRound() {
    this.cars.forEach((car) => car.move(getRandomNumber(0, 9)));
    this.currentRound++;
  }
}
