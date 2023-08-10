import Car from '../Car/index.js';

class RacingGame {
  static DEFAULT_MAX_ROUNDS = 5;

  static ERROR_MESSAGE = {
    NO_CAR_INSTACE: 'Car 클래스가 아닙니다.',
    INVALID_MAX_ROUNDS: 'Max Round가 숫자가 아닙니다.',
  };

  #cars;
  #rounds;
  #maxRounds;
  #records;

  constructor(cars, maxRounds = RacingGame.DEFAULT_MAX_ROUNDS) {
    this.validate(cars, maxRounds);

    this.#cars = cars;
    this.#rounds = 0;
    this.#maxRounds = maxRounds;
    this.#records = [];
  }

  validate(cars, maxRounds) {
    if (!cars?.every((car) => car instanceof Car)) {
      throw new Error(RacingGame.ERROR_MESSAGE.NO_CAR_INSTACE);
    }

    if (typeof maxRounds !== 'number' || isNaN(maxRounds)) {
      throw new Error(RacingGame.ERROR_MESSAGE.INVALID_MAX_ROUNDS);
    }
  }

  get cars() {
    return this.#cars;
  }

  get rounds() {
    return this.#rounds;
  }

  get records() {
    return this.#records;
  }

  get carsRecord() {
    return this.#cars.map((car) => ({
      name: car.name,
      distanceDriven: car.distanceDriven,
    }));
  }

  get maxDistanceDriven() {
    return Math.max(...this.#cars.map((car) => car.distanceDriven));
  }

  get winningCars() {
    return this.#cars.filter(
      (car) => car.distanceDriven === this.maxDistanceDriven
    );
  }

  saveCurrentRecord() {
    this.#records.push(this.carsRecord);
  }

  runRound(checkCanMoveForward) {
    this.#rounds = this.#rounds + 1;

    this.#cars.forEach((car) => {
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
