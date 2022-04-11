import MovingStrategy from './MovingStrategy.js';

const CarStatus = Object.freeze({
  STOP: 'STOP',
  MOVING: 'MOVING',
});

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

  run(movingStrategy) {
    if (!(movingStrategy instanceof MovingStrategy))
      throw new Error('인자로 MovingStrategy를 받아와야 합니다.');
    return movingStrategy.isMoveable() ? this.#move() : this.#stop();
  }
}
