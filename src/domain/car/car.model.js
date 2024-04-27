import { validateCarName } from "./car.contract.js";
import { boundaryRandomNumber } from "../../utils/randomNumber.js";
import {
  BOUNDARY_LEFT,
  BOUNDARY_RIGHT,
  CAR_DISPLAY,
  INITIAL_POSITION,
  MOVE_DISTANCE,
  MOVE_THRESHOLD,
} from "./car.constant.js";

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
    if (randomNumber >= MOVE_THRESHOLD) {
      this.#position += MOVE_DISTANCE;
    }
  }

  display() {
    const carDisplay = CAR_DISPLAY.repeat(this.#position);
    const displayMessage = `${this.#name}: ${carDisplay}`;

    console.log(displayMessage);

    return displayMessage;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}
