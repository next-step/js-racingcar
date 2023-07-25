import { NUMBER_OF_MATCHES, ZERO } from "../constants";
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
}

export default Race;
