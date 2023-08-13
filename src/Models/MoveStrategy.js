class MoveStrategy {
  movableCriteria;
  static DEFAULT_MOVABLE_CRITERIA = 4;

  constructor() {
    this.movableCriteria = MoveStrategy.DEFAULT_MOVABLE_CRITERIA;
  }

  getNumber() {
    throw new Error("getNumber()가 구현되지 않았습니다.");
  }

  isMovable() {
    throw new Error("isMovable()이 구현되지 않았습니다.");
  }

  setMovableCriteria(criteria) {
    this.movableCriteria = criteria;
  }
}

export class RandomStrategy extends MoveStrategy {
  #min;
  #max;

  static MIN_NUM = 0;
  static MAX_NUM = 9;

  constructor(min = RandomStrategy.MIN_NUM, max = RandomStrategy.MAX_NUM) {
    super();
    this.#min = min;
    this.#max = max;
  }

  getNumber() {
    return Math.floor(Math.random() * (this.#max - this.#min + 1)) + this.#min;
  }

  isMovable() {
    this.getNumber() >= this.movableCriteria;
  }
}

export class FixedStrategy extends MoveStrategy {
  #num;

  constructor(num) {
    super();
    this.#num = num;
  }

  getNumber() {
    return this.#num;
  }

  isMovable() {
    return this.#num >= this.movableCriteria;
  }
}
