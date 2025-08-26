class Car {
  #name;

  #xPosition = 0;

  constructor(name) {
    this.#name = name;
  }

  goForward() {
    this.#go(1);
  }

  #go(amount) {
    this.#xPosition += amount;
  }
}
