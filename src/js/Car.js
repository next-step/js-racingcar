const CarStatus = Object.freeze({
  STOP: 'STOP',
  MOVING: 'MOVING',
});

function moveableNumber() {
  const MOVABLE_RANGE_MIN_NUMBER = 0;
  const MOVABLE_RANGE_MAX_NUMBER = 9;
  return (
    Math.random() * (MOVABLE_RANGE_MAX_NUMBER - MOVABLE_RANGE_MIN_NUMBER) +
    MOVABLE_RANGE_MIN_NUMBER
  );
}

export class Car {
  #name;
  #status;
  #target;

  constructor({ name, target }) {
    this.#name = name;
    this.#target = target;
    this.#stop();
  }

  #move() {
    this.#status = CarStatus.MOVING;
  }

  #stop() {
    this.#status = CarStatus.STOP;
  }

  get $target() {
    return this.#target;
  }

  isMoveStatus() {
    return this.#status === CarStatus.MOVING;
  }

  static #isEnableMove(number) {
    const MOVABLE_NUMBER = 4;
    return number >= MOVABLE_NUMBER;
  }

  run() {
    if (Car.#isEnableMove(moveableNumber())) {
      this.#move();
      return;
    }
    this.#stop();
  }
}
