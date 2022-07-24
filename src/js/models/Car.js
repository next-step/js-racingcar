class Car {
  /** @type {number} */
  #coin;

  /** @type {string} */
  #name;

  /** @type {string[]} */
  #history;

  constructor(name, coin) {
    this.#name = name;
    this.#coin = coin;
    this.#history = [];
  }

  get name() {
    return this.#name;
  }

  get coin() {
    return this.#coin;
  }

  get history() {
    return this.#history;
  }

  move() {
    this.#coin -= 1;
    this.#history.push('move');
  }

  wait() {
    this.#coin -= 1;
    this.#history.push('wait');
  }
}

export default Car;
