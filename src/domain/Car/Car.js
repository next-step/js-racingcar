import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  RUN_THRESHOLD,
  RUN_UNIT,
  START_POSITION,
} from "./Car.const";

export class Car {
  #name;
  #position;

  constructor(name, position = START_POSITION) {
    this.#validateCarName(name);
    this.#name = name;
    this.#position = position;
  }
  #validateCarName = (name) => {
    if (name.trim().length < MIN_NAME_LENGTH)
      throw new Error("이름은 공백을 제외한 한글자 이상이어야한다.");
    if (name.length > MAX_NAME_LENGTH)
      throw new Error(`이름은 ${MAX_NAME_LENGTH}글자 이하이어야한다.`)
  };
  getName() {
    return this.#name;
  }
  getPosition() {
    return this.#position;
  }

  getPositionLog() {
    return `${this.#name} : ${"-".repeat(this.#position)}`;
  }

  run(number) {
    if (number < RUN_THRESHOLD) return;
    this.#position += RUN_UNIT;
  }
}
