import MovingStrategy from './MovingStrategy.js';

const CarStatus = Object.freeze({
  STOP: 'STOP',
  MOVING: 'MOVING',
});

const carName = Object.freeze({
  MIN_LENGTH: 1,
  MAX_LENGTH: 5,
});

function isEmptyCarName(name) {
  if (name === undefined || name === null || name.trim() === '')
    throw new Error('이름은 필수 입니다.');
}

function isInValidCarNameLength(name) {
  if (!(name.length >= carName.MIN_LENGTH && name.length <= carName.MAX_LENGTH))
    throw new Error(
      `이름은 ${carName.MIN_LENGTH}~${carName.MAX_LENGTH} 까지 가능합니다.`
    );
}

function validateName(name) {
  isEmptyCarName(name);
  isInValidCarNameLength(name);
}

class Car {
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

export { Car, validateName };
