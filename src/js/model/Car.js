import CarName from './CarName.js';
import Process from './Process.js';

class Car {
  #name;

  #distance = 0;

  #process = [];

  constructor(name) {
    this.#name = name;
    this.#validateName();
  }

  #validateName() {
    if (this.#name instanceof CarName) return;
    throw new Error('Car의 name은 CarName의 인스턴스여야 합니다.');
  }

  run(movingStrategy) {
    if (!movingStrategy.isMoveable()) return false;
    this.#distance += 1;
    return true;
  }

  set process(process) {
    if (process instanceof Process) {
      this.#process = process;
      return;
    }
    throw new Error('Car의 process는 Process의 인스턴스여야 합니다.');
  }

  get process() {
    return this.#process;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }
}

export default Car;
