const CAR_ADVANCE_MAX_NUMBER = 9;

const CAR_ADVANCE_THRESHOLD_NUMBER = 4;

const defaultAdvanceCondition = () => {
  return Math.random() * CAR_ADVANCE_MAX_NUMBER >= CAR_ADVANCE_THRESHOLD_NUMBER;
};

export default class Car {
  #name;
  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 0;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  advance(advanceCondition = defaultAdvanceCondition) {
    if (advanceCondition(this.#name, this.#distance)) {
      this.#distance += 1;
    }
  }
}
