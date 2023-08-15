import Car from "./Car";

export default class Cars {
  static #DEFAULT_RACING_ROUND_NUMBER = 5;
  static #RACING_ROUND_MIN_VALUE = 1;
  static GAME_STEP = Object.freeze({
    SET_CARS: "SET_CARS",
    SET_ROUND_NUMBER: "SET_ROUND_NUMBER",
    EXECUTE_ROUND: "EXECUTE_ROUND",
    AWARDS: "AWARDS",
  });
  static ERROR_MESSAGES = Object.freeze({
    DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
    INVALID_RACING_ROUND_FORMAT: "양의 정수 형식의 값을 입력해 주세요.",
    INVALID_RACING_ROUND_VALUE: "1이상 값을 입력해주세요.",
  });
  static #rRacingRound = /^[0-9]+$/;
  static #CAR_ADVANCE_MAX_NUMBER = 9;
  static #CAR_ADVANCE_THRESHOLD_NUMBER = 4;
  static #defaultAdvanceCondition = () => {
    return (
      Math.random() * this.#CAR_ADVANCE_MAX_NUMBER >=
      this.#CAR_ADVANCE_THRESHOLD_NUMBER
    );
  };

  #roundNumber = Cars.#DEFAULT_RACING_ROUND_NUMBER;
  #cars = [];
  #nextGameStep = Cars.GAME_STEP.SET_CARS;

  constructor(names) {
    if (
      names instanceof Array &&
      names.every((name) => typeof name === "string")
    ) {
      this.addCars(names);
    }
  }

  get allCarStatus() {
    return this.#cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  get carNames() {
    return this.#cars.map((car) => car.name);
  }

  #validateCarNames = (newCars) => {
    const carNamesSet = new Set(this.carNames);

    newCars.forEach((newCar) => {
      if (carNamesSet.has(newCar)) {
        throw new Error(Cars.ERROR_MESSAGES.DUPLICATE_CAR_NAME);
      }
    });
  };

  addCar(name) {
    this.#validateCarNames([name]);

    const car = new Car(name);

    this.#cars.push(car);
  }

  addCars(names) {
    this.#validateCarNames(names, this.carNames);

    names.forEach((car) => this.addCar(car));

    this.#nextGameStep = Cars.GAME_STEP.SET_ROUND_NUMBER;
  }

  executeOneRound(advanceCondition) {
    this.#cars.forEach((car) => {
      const isAdvance =
        typeof advanceCondition === "function"
          ? advanceCondition(car.name, car.distance)
          : Cars.#defaultAdvanceCondition();

      if (isAdvance) {
        car.advance();
      }
    });
  }

  executeMultipleRounds(afterRoundAction, advanceConditions = []) {
    Array.from({ length: this.#roundNumber }, (_, index) => {
      this.executeOneRound(advanceConditions[index]);

      if (typeof afterRoundAction === "function") {
        afterRoundAction(this.allCarStatus);
      }
    });

    this.#nextGameStep = Cars.GAME_STEP.AWARDS;
  }

  get winners() {
    const maxDistance = Math.max(...this.#cars.map((car) => car.distance));

    return this.#cars
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.name);
  }

  #validateRoundNumber = (roundNumber) => {
    if (!Cars.#rRacingRound.test(roundNumber)) {
      throw new Error(Cars.ERROR_MESSAGES.INVALID_RACING_ROUND_FORMAT);
    }

    const enteredRacingRoundNumber = Number(roundNumber);

    if (enteredRacingRoundNumber < Cars.#RACING_ROUND_MIN_VALUE) {
      throw new Error(Cars.ERROR_MESSAGES.INVALID_RACING_ROUND_VALUE);
    }
  };

  set roundNumber(number) {
    this.#validateRoundNumber(number);

    this.#roundNumber = Number(number);

    this.#nextGameStep = Cars.GAME_STEP.EXECUTE_ROUND;
  }

  get nextGameStep() {
    return this.#nextGameStep;
  }
}
