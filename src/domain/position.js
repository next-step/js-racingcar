export class Position {
  #MIN_VALUE = 0;
  #INCREASE_VALUE = 1;

  #value;

  constructor(value) {
    if (value < this.#MIN_VALUE) {
      throw new Error(`${this.#MIN_VALUE}보다 작을 수 없습니다.`);
    }
    this.#value = value;
  }

  increase() {
    this.#value += this.#INCREASE_VALUE;
  }
}
