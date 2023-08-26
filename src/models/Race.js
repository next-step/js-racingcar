import { NUMBER_OF_MATCHES, RANDOM_RANGE, ZERO } from "../constants";
import { random } from "../utils/random";
import Car from "./Car";

class Race {
  totalMatches;
  currentMatches;
  cars;
  constructor() {
    this.totalMatches = NUMBER_OF_MATCHES;
    this.currentMatches = ZERO;
    this.cars = [];
  }

  setCars(...names) {
    this.cars = names.map((name) => new Car(name));
  }

  checkMove(number) {
    if (number > RANDOM_RANGE.MOVE_STANDARD_NUMBER) {
      return true;
    }
    return false;
  }

  doMove(car) {
    const number = random(RANDOM_RANGE.MIN_NUM, RANDOM_RANGE.MAX_NUM);
    if (this.checkMove(number)) {
      car.move();
    }
  }

  startRound() {
    this.currentMatches += 1;
    this.cars.forEach((car) => this.doMove(car));
    // this.print();
  }

  getResult() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    return this.cars
      .filter((car) => car.position === maxPosition)
      .map((car) => car.name);
  }

  print() {
    console.log(
      this.cars
        .map((car) => `${car.name} : ${"-".repeat(car.position)}`)
        .join("\n")
    );
  }
}

export default Race;
