import { validateCarName } from "./car.contract";
import { boundaryRandomNumber } from "../utils/randomNumber";

const MOVING_CONDITION = 4;

const BOUNDARY_LEFT = 0;
const BOUNDARY_RIGHT = 9;

const CAR_DISPLAY = "-";

export class Car {
  #name;
  #position;

  constructor({ name }) {
    validateCarName(name);

    this.#name = name;
    this.#position = 0;
  }
  move() {
    const randomNumber = boundaryRandomNumber(BOUNDARY_LEFT, BOUNDARY_RIGHT);
    if (randomNumber >= MOVING_CONDITION) {
      this.#position += 1;
    }
  }

  display() {
    console.log(`${this.#name}: ${CAR_DISPLAY.repeat(this.#position)}`);
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
