import {
  MIN_NAME_LENGTH,
  RUN_THRESHOLD,
  RUN_UNIT,
  START_POSITION,
} from "./domain/Car/consts";

export class Car {
  #name;
  #position;

  constructor(name, position = START_POSITION) {
    if (!this.validateCarName(name)) return;
    this.#name = name;
    this.#position = position;
  }

  validateCarName = (name) => {
    if (name.trim().length < MIN_NAME_LENGTH)
      throw new Error("이름은 공백을 제외한 한글자 이상이어야합니다.");
    return true;
  };
  getName() {
    return this.#name;
  }
  getPosition() {
    return this.#position;
  }

  getPositionLog() {
    return `${this.#name} : ${new Array(this.#position).fill("-").join("")}`;
  }

  run(number) {
    if (number < RUN_THRESHOLD) return;
    this.#position += RUN_UNIT;
  }
}
