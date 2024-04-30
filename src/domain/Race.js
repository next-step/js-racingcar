import Car from "./Car.js";
import { getRandomNumber } from "../utils/number.js";
import { CAR, RACE } from "../constant/index.js";

export default class Race {
  cars = [];
  maxRound;
  currentRound;

  constructor(carNames, maxRound) {
    this.cars = carNames.map((name) => new Car(name));
    this.maxRound = maxRound;
    this.currentRound = 0;
  }

  playRound() {
    this.cars.forEach((car) =>
      car.move(getRandomNumber(CAR.MIN_RANDOM_NUMBER, CAR.MAX_RANDOM_NUMBER))
    );
    this.currentRound++;
  }

  get winners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((car) => car.position === maxPosition);
  }
}
