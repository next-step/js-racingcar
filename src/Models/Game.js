import { getRandomIntRangeOf } from "../utils";
import Car from "./Car";

export default class Game {
  static TOTAL_ROUNDS = 5;
  static RANDOM_NUM_LOWER_LIMIT = 0;
  static RANDOM_NUM_UPPER_LIMIT = 9;
  static CAR_MOVE_CRITERIA = 4;
  static CAR_MOVE_STEP = 1;

  static INITIAL_ROUND = 1;

  static getRandomNumber = () => {
    return getRandomIntRangeOf(
      Game.RANDOM_NUM_LOWER_LIMIT,
      Game.RANDOM_NUM_UPPER_LIMIT
    );
  };

  static isMovable = (randomNumber) => {
    return randomNumber >= Game.CAR_MOVE_CRITERIA;
  };

  static ERROR_MESSAGE = Object.freeze({
    EMPTY: "빈 값으로는 프로그램이 동작할 수 없습니다.",
    DUPLICATE_CAR_NAME:
      "중복된 자동차 이름으로는 프로그램이 동작할 수 없습니다.",
  });

  #cars;
  #currRound;
  #roundHistory;
  #winners;

  constructor(userInput) {
    this.#validateUserInput(userInput);

    const carNames = this.#parseCarNames(userInput);

    this.#validateDuplicateCarNames(carNames);

    this.#cars = carNames.map((carName) => new Car(carName));

    this.#currRound = Game.INITIAL_ROUND;
    this.#roundHistory = [];
    this.#winners = [];
  }

  get cars() {
    return this.#cars;
  }

  get currRound() {
    return this.#currRound;
  }

  get roundHistory() {
    return this.#roundHistory;
  }

  get winners() {
    return this.#winners;
  }

  #isEmptyUserInput(userInput) {
    return !userInput;
  }

  #validateUserInput(userInput) {
    if (this.#isEmptyUserInput(userInput))
      throw new Error(Game.ERROR_MESSAGE.EMPTY);
  }

  #parseCarNames(userInput) {
    const INPUT_SPLIT_SYMBOL = ",";

    return userInput.split(INPUT_SPLIT_SYMBOL).map((carName) => carName.trim());
  }

  #hasDuplicatedCarNames(carNames) {
    return new Set(carNames).size !== carNames.length;
  }

  #validateDuplicateCarNames(carNames) {
    if (this.#hasDuplicatedCarNames(carNames))
      throw new Error(Game.ERROR_MESSAGE.DUPLICATE_CAR_NAME);
  }

  #saveRoundHistory() {
    const roundRecord = this.#cars.map(
      (car) => new Car(car.name, car.position)
    );

    this.#roundHistory.push(roundRecord);
  }

  #playRound() {
    this.#cars.forEach((car) => {
      car.tryMoveWith(Game.getRandomNumber());
    });

    this.#saveRoundHistory();
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));

    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  play() {
    while (this.#currRound < Game.INITIAL_ROUND + Game.TOTAL_ROUNDS) {
      this.#playRound();
      this.#currRound += 1;
    }

    this.#setWinners();
  }
}
