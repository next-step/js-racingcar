import {
  TRACK_MARK,
  CAR_MOVE_PER_RACING,
  FORWARD_CONDITION,
} from "./constants.js";
import Validator from "./Validator.js";

class Car {
  #name;
  #position;

  constructor(name) {
    Validator.validateValidCarName(name);
    this.#name = name;
    this.#position = 0;
  }

  #move() {
    this.#position += CAR_MOVE_PER_RACING;
  }

  takeTurn(randomNum) {
    if (randomNum >= FORWARD_CONDITION) {
      this.#move();
    }
  }

  getName() {
    return this.#name;
  }

  getCurrentPosition() {
    return this.#position;
  }

  printTrack() {
    console.log(`${this.#name} : ${TRACK_MARK.repeat(this.#position)}`);
  }
}

export default Car;
