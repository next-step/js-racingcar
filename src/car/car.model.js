import { validateCarName } from "./car.contract";
import { boundaryRandomNumber } from "../utils/randomNumber";

const MOVING_CONDITION = 4;
const MOVING_DISTANCE = 1;

const BOUNDARY_LEFT = 0;
const BOUNDARY_RIGHT = 9;

const CAR_DISPLAY = "-";

const INITIAL_POSITION = 0;

export class Car {
  #name;
  #position;

  constructor({ name }) {
    validateCarName(name);

    this.#name = name;
    this.#position = INITIAL_POSITION;
  }
  move() {
    const randomNumber = boundaryRandomNumber(BOUNDARY_LEFT, BOUNDARY_RIGHT);
    if (randomNumber >= MOVING_CONDITION) {
      this.#position += MOVING_DISTANCE;
    }
  }

  display() {
    return `${this.#name}: ${CAR_DISPLAY.repeat(this.#position)}`;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
