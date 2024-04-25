class Move {
  #position;

  constructor() {
    this.#position = 0;
  }

  forward() {
    this.#position = this.#position + 1;
    return this;
  }

  backward() {
    this.#position = this.#position - 1;
    return this;
  }

  getPosition() {
    return this.#position;
  }
}

export default Move;
