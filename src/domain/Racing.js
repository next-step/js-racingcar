import { EXECUTE_RACING_MAX_COUNT } from "../constants/number.js";
import { randomNumber } from "../util/random.js";
import Car from "./Car.js";

export class Racing {
  cars = [];
  currRound;
  maxRound;

  constructor(enter) {
    this.cars = enter.map((name) => new Car(name));
    this.currRound = 0;
    this.maxRound = EXECUTE_RACING_MAX_COUNT;
  }

  gameRound() {
    this.cars.forEach((car) => car.drive(randomNumber(0, 9)));
    this.currRound++;
  }

  get winner() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars.filter((car) => car.position === maxPosition);
  }
}
