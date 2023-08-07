import Car from "./Car";
import { getRandomNumber } from "../utils/utils";

export default class Game {
  static CAR_MOVE_STEP = 1;
  static CAR_MOVE_CRITERIA = 4;

  static INITIAL_ROUND = 1;
  static TOTAL_ROUNDS = 5;

  static INPUT_ERROR_MESSAGE = Object.freeze({
    EMPTY: "빈 값으로는 프로그램이 동작할 수 없습니다.",
    DUPLICATE_CAR_NAME:
      "중복된 자동차 이름으로는 프로그램이 동작할 수 없습니다.",
  });

  // TODO: 클래스 외부로 분리?
  static RANDOM_NUM_LOWER_LIMIT = 0;
  static RANDOM_NUM_UPPER_LIMIT = 9;

  static isMovable = (randomNumber) => {
    return randomNumber >= Game.CAR_MOVE_CRITERIA;
  };

  #cars;
  #currRound;
  #playRoundCalls;
  #roundHistory;
  #winners;

  constructor(userInput) {
    this.#validateUserInput(userInput);

    const carNames = this.#parseCarNames(userInput);

    this.#validateDuplicateCarNames(carNames);

    this.#cars = carNames.map((carName) => new Car(carName));

    this.#currRound = Game.INITIAL_ROUND;
    this.#playRoundCalls = 0;
    this.#roundHistory = [];
    this.#winners = [];
  }

  get cars() {
    return this.#cars;
  }

  get currRound() {
    return this.#currRound;
  }

  get playRoundCalls() {
    return this.#playRoundCalls;
  }

  get roundHistory() {
    return this.#roundHistory;
  }

  get winners() {
    return this.#winners;
  }

  #validateUserInput(userInput) {
    if (!userInput) throw new Error(Game.INPUT_ERROR_MESSAGE.EMPTY);

    return;
  }

  #parseCarNames(userInput) {
    const INPUT_SPLIT_SYMBOL = ",";

    return userInput.split(INPUT_SPLIT_SYMBOL).map((carName) => carName.trim());
  }

  #validateDuplicateCarNames(carNames) {
    if (new Set(carNames).size !== carNames.length)
      throw new Error(Game.INPUT_ERROR_MESSAGE.DUPLICATE_CAR_NAME);

    return;
  }

  #saveRoundHistory() {
    const roundCarsHistory = this.#cars.map(
      (car) => new Car(car.name, car.position)
    );

    this.#roundHistory.push(roundCarsHistory);
  }

  #playRound() {
    this.#cars.forEach((car) => {
      car.tryMoveWith(getRandomNumber());
    });

    this.#playRoundCalls += 1;

    this.#saveRoundHistory();
  }

  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));

    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  play() {
    while (this.#currRound <= Game.TOTAL_ROUNDS) {
      this.#playRound();
      this.#currRound += 1;
    }

    this.#setWinners();
  }
}
