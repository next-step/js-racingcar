import { MAX_CAR_NAME_LENGTH } from "../constants/car";

class Car {
  #name;
  #position = 0;

  constructor(name) {
    if (name.length > MAX_CAR_NAME_LENGTH) {
      throw new Error("이름은 5자 이하여야 합니다.");
    }
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  static shouldCarMove(randomValue) {
    return randomValue >= 4;
  }

  static isValidName(name) {
    return name.length <= MAX_CAR_NAME_LENGTH;
  }

  moveRandom() {
    const randomValue = Math.floor(Math.random() * 10);

    if (Car.shouldCarMove(randomValue)) {
      this.move();
    }
  }

  move() {
    this.#position++;
  }

  positionToString() {
    return "-".repeat(this.#position);
  }

  statusToString() {
    return `${this.#name} : ${this.positionToString()}`;
  }
}

export default Car;
