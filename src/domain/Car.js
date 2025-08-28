export class Car {
  #name;

  #xPosition = 0;

  constructor(name) {
    this.#name = name;
  }

  get record() {
    return {
      name: this.#name,
      xPosition: this.#xPosition,
    };
  }

  goForward() {
    this.#go(1);
  }

  #go(amount) {
    this.#xPosition += amount;
  }
}
