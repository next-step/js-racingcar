const INIT_POSITION = 0;
const RUN_THRESHOLD = 4;
const CAR_RUN_DISTANCE = 1;

export default class Car {
  #name;
  #position = INIT_POSITION;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }

  runRound() {
    const randomNumber = this.getRandomNumber();
    if (randomNumber >= RUN_THRESHOLD) this.#position += CAR_RUN_DISTANCE;
  }
}
