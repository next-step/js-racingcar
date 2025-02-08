import { TRACK_MARK } from "./constants.js";

class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  move() {
    this.#position++;
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
