import { EXECUTE_RACING_MAX_COUNT, NINE, ZERO } from "../constants/number.js";
import { randomNumber } from "../util/random.js";
import Car from "./Car.js";

export class Racing {
  cars = [];
  currRound;
  maxRound;

  constructor(enter) {
    this.cars = enter.map((name) => new Car(name));
    this.currRound = 0;
  }

  gameRound() {
    this.cars.forEach((car) => car.drive(randomNumber(ZERO, NINE)));
    this.currRound++;
  }

  set maxRound(round) {
    this.maxRound = round;
  }

  get winner() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((car) => car.position === maxPosition);
  }
}
