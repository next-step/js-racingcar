export class RacingCarModel {
  #name = '';

  #moveForwardCount = 0;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  set name(name) {
    this.#name = name;
  }

  get moveForwardCount() {
    return this.#moveForwardCount;
  }

  set moveForwardCount(moveForwardCount) {
    this.#moveForwardCount = moveForwardCount;
  }
}
