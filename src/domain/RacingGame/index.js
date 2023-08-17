import CarList from '../CarList/index.js';

class RacingGame {
  static DEFAULT_MAX_ROUNDS = 5;

  static ERROR_MESSAGE = {
    INVALID_MAX_ROUNDS: 'Max Round가 숫자가 아닙니다.',
  };

  #carList;
  #rounds;
  #maxRounds;
  #records;

  constructor(carNames, maxRounds = RacingGame.DEFAULT_MAX_ROUNDS) {
    this.validate(maxRounds);

    this.#carList = new CarList(carNames);
    this.#rounds = 0;
    this.#maxRounds = maxRounds;
    this.#records = [];
  }

  validate(maxRounds) {
    if (typeof maxRounds !== 'number' || isNaN(maxRounds)) {
      throw new Error(RacingGame.ERROR_MESSAGE.INVALID_MAX_ROUNDS);
    }
  }

  get carList() {
    return this.#carList;
  }

  get rounds() {
    return this.#rounds;
  }

  get records() {
    return this.#records;
  }

  get winningCars() {
    return this.#carList.cars.filter(
      (car) => car.distanceDriven === this.#carList.maxDistanceDriven
    );
  }

  saveCurrentRecord() {
    this.#records.push(this.#carList.carsRecord);
  }

  runRound(checkCanMoveForward) {
    this.#rounds = this.#rounds + 1;

    this.#carList.cars.forEach((car) => {
      if (typeof checkCanMoveForward === 'function' && checkCanMoveForward()) {
        car.moveForward();
      }
    });
    this.saveCurrentRecord();
  }

  startRace(checkCanMoveForward) {
    for (let i = 0; i < this.#maxRounds; i++) {
      this.runRound(checkCanMoveForward);
    }
  }
}

export default RacingGame;
