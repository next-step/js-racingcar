import MovingStrategy from './MovingStrategy.js';

const CarStatus = Object.freeze({
  STOP: 'STOP',
  MOVING: 'MOVING',
});

export class Car {
  #name;
  #status;
  #distance;

  constructor({ name }) {
    this.#name = name;
    this.#distance = 0;
    this.#stop();
  }

  #move() {
    this.#distance += 1;
    this.#status = CarStatus.MOVING;
  }

  #stop() {
    this.#status = CarStatus.STOP;
  }

  get name() {
    return this.#name;
  }

  get movingDistance() {
    return this.#distance;
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
