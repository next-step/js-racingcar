export class CarDto {
  #carName;
  #isForward;

  constructor(carName, isForward) {
    this.#carName = carName;
    this.#isForward = isForward;
  }

  get carName() {
    return this.#carName;
  }

  get isForward() {
    return this.#isForward;
  }
}
