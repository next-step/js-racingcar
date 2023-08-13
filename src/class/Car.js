import Validator from "./Validator";

export default class Car {
  #name;
  #distance;
  #CAR_ADVANCE_MAX_NUMBER = 9;
  #CAR_ADVANCE_THRESHOLD_NUMBER = 4;
  #defaultAdvanceCondition = () => {
    return (
      Math.random() * this.#CAR_ADVANCE_MAX_NUMBER >=
      this.#CAR_ADVANCE_THRESHOLD_NUMBER
    );
  };
  #validateCarName = Validator.validateCarName;

  constructor(name) {
    this.#validateCarName(name);

    this.#name = name;
    this.#distance = 0;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  advance(advanceCondition) {
    if (
      typeof advanceCondition === "function"
        ? advanceCondition(this.#name, this.#distance)
        : this.#defaultAdvanceCondition()
    ) {
      this.#distance += 1;
    }
  }
}
