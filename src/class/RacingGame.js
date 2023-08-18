import Cars from "./Cars";

export default class RacingGame {
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

  static #racingRoundRegex = /^[0-9]+$/;
  static #CAR_ADVANCE_MAX_NUMBER = 9;
  static #CAR_ADVANCE_THRESHOLD_NUMBER = 4;
  static #defaultAdvanceCondition = () => {
    return (
      Math.random() * this.#CAR_ADVANCE_MAX_NUMBER >=
      this.#CAR_ADVANCE_THRESHOLD_NUMBER
    );
  };

  #roundNumber = RacingGame.#DEFAULT_RACING_ROUND_NUMBER;
  #currentRound = 1;
  #nextGameStep = RacingGame.GAME_STEP.SET_CARS;
  #cars;

  constructor(names) {
    this.#cars = new Cars(names);
  }

  #validateRoundNumber = (roundNumber) => {
    if (!RacingGame.#racingRoundRegex.test(roundNumber)) {
      throw new Error(RacingGame.ERROR_MESSAGES.INVALID_RACING_ROUND_FORMAT);
    }

    const enteredRacingRoundNumber = Number(roundNumber);

    if (enteredRacingRoundNumber < RacingGame.#RACING_ROUND_MIN_VALUE) {
      throw new Error(RacingGame.ERROR_MESSAGES.INVALID_RACING_ROUND_VALUE);
    }
  };

  set roundNumber(number) {
    this.#validateRoundNumber(number);

    this.#roundNumber = Number(number);

    this.#nextGameStep = RacingGame.GAME_STEP.EXECUTE_ROUND;
  }

  get nextGameStep() {
    return this.#nextGameStep;
  }

  get currentRound() {
    return this.#currentRound;
  }

  set cars(names) {
    this.#cars.addCars(names);

    this.#nextGameStep = RacingGame.GAME_STEP.SET_ROUND_NUMBER;
  }

  get cars() {
    return this.#cars;
  }

  executeOneRound(advanceCondition) {
    this.#cars.advanceCars((car) =>
      typeof advanceCondition === "function"
        ? advanceCondition(car.name, car.distance)
        : RacingGame.#defaultAdvanceCondition(),
    );

    this.#currentRound += 1;
  }

  executeMultipleRounds(afterRoundAction, advanceConditions = []) {
    Array.from({ length: this.#roundNumber }, (_, index) => {
      this.executeOneRound(advanceConditions[index]);

      if (typeof afterRoundAction === "function") {
        afterRoundAction(this.#cars.allStatus);
      }
    });

    this.#nextGameStep = RacingGame.GAME_STEP.AWARDS;
  }
}
