export const START_POSITION = 0;
export const RUN_THRESHOLD = 4;
export const RUN_UNIT = 1;

export class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = START_POSITION;
  }

  getName() {
    return this.#name;
  }
  getPosition() {
    return this.#position;
  }

  run(number) {
    if (number < RUN_THRESHOLD) return;
    this.#position += RUN_UNIT;
  }
}
