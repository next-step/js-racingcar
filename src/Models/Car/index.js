import {
  CarNameNotStringError,
  CarNameEmptyError,
  CarNameTooLongError,
} from "./errors";
export default class Car {
  #name;
  #position;

  static INITIAL_POSITION = 0;
  static NAME_MAX_LENGTH = 5;
  static MOVE_STEP = 1;

  static of(name, position = Car.INITIAL_POSITION) {
    return new Car(name, position);
  }

  constructor(name, position = Car.INITIAL_POSITION) {
    this.#validateName(name);

    this.#name = name.trim();
    this.#position = position;
  }

  #isNotString(name) {
    return typeof name !== "string";
  }

  #isEmpty(name) {
    return name.trim().length === 0;
  }

  #isLongName(name) {
    return name.trim().length > Car.NAME_MAX_LENGTH;
  }

  #validateName(name) {
    if (this.#isNotString(name)) throw new CarNameNotStringError();
    if (this.#isEmpty(name)) throw new CarNameEmptyError();
    if (this.#isLongName(name)) throw new CarNameTooLongError();
  }

  getRecord() {
    return {
      name: this.#name,
      position: this.#position,
    };
  }

  #move() {
    this.#position += Car.MOVE_STEP;
  }

  tryMove(moveStrategy) {
    if (moveStrategy.isMovable()) {
      this.#move();
    }
  }
}
