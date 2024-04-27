class Move {
  #position;

  static INITIAL_POSITION = 0;
  static DEFAULT_MOVE_SIZE = 1;

  constructor(position = Move.INITIAL_POSITION) {
    this.#position = position;
  }

  get position() {
    return this.#position;
  }

  forward(moveSize = Move.DEFAULT_MOVE_SIZE) {
    this.#position = this.#position + moveSize;
    return this;
  }

  backward(moveSize = Move.DEFAULT_MOVE_SIZE) {
    this.#position = this.#position - moveSize;
    return this;
  }

  stop() {
    return this;
  }
}

export default Move;
