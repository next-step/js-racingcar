class Move {
  #position;

  constructor() {
    this.#position = 0;
  }

  get position() {
    return this.#position;
  }

  forward() {
    this.#position = this.#position + 1;
    return this;
  }

  backward() {
    this.#position = this.#position - 1;
    return this;
  }

  stop() {
    return this;
  }
}

export default Move;
