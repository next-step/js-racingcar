import Car from "./Car";
import {
  GAME_INIT_ROUND,
  INPUT_ERROR_MESSAGE,
  TOTAL_GAME_ROUNDS,
  INPUT_SPLIT_SYM,
} from "./constants/game";
import { getRandomNumber } from "./utils/utils";

export default class Game {
  #cars;
  #currRound;
  #playRoundCalls;
  #roundHistory;
  #winners;

  /** readline 모듈로부터 userInput을 받아, Game setting을 수행한다.
   * @param {string} userInput
   */
  constructor(userInput) {
    this.#validateUserInput(userInput);

    const carNames = this.#parseCarNames(userInput);

    this.#validateDuplicateCarNames(carNames);

    this.#cars = carNames.map((carName) => new Car(carName));

    this.#currRound = GAME_INIT_ROUND;
    this.#playRoundCalls = 0;
    this.#roundHistory = [];
    this.#winners = [];
  }

  /**
   * @returns {Car[]}
   */
  get cars() {
    return this.#cars;
  }

  /**
   * @returns {number}
   */
  get currRound() {
    return this.#currRound;
  }

  /**
   * @returns {number}
   */
  get playRoundCalls() {
    return this.#playRoundCalls;
  }

  /**
   * @returns {Car[][]}
   */
  get roundHistory() {
    return this.#roundHistory;
  }

  /**
   * @returns {Car[]}
   */
  get winners() {
    return this.#winners;
  }

  /**
   * userInput의 유효성을 검사하여, 빈 값이면 에러를 발생시킨다.
   * @param {string} userInput
   * @returns {undefined}
   */
  #validateUserInput(userInput) {
    if (!userInput) throw new Error(INPUT_ERROR_MESSAGE.EMPTY);

    return;
  }

  /**
   * 1. userInput을 SPLIT_INPUT_SYM으로 구분하여 자동차 이름 배열을 반환한다.
   * 2. 이 때, 자동차 이름의 앞뒤 공백은 제거한다.
   * @param {string} userInput
   * @returns {string[]}
   */
  #parseCarNames(userInput) {
    return userInput.split(INPUT_SPLIT_SYM).map((carName) => carName.trim());
  }

  /**
   * 자동차 이름의 중복 여부를 확인하고, 중복 발생 시 에러를 발생시킨다.
   * @param {string[]} carNames
   * @returns {undefined}
   */
  #validateDuplicateCarNames(carNames) {
    if (new Set(carNames).size !== carNames.length)
      throw new Error(INPUT_ERROR_MESSAGE.DUPLICATE_CAR_NAME);

    return;
  }

  /**
   * 현재 라운드 자동차들의 상태를 깊은 복사하여 저장한다.
   */
  #saveRoundHistory() {
    const roundCarsHistory = this.#cars.map(
      (car) => new Car(car.name, car.position)
    );

    this.#roundHistory.push(roundCarsHistory);
  }

  /**
   * 1. 현재 라운드를 진행한다.
   * 2. 게임 내 모든 자동차에 대해 임의의 숫자를 기반으로 전진 여부를 결정한다.
   * 3. 라운드 카운트를 1 늘리고, 현재 라운드 진행 결과를 저장한다.
   */
  #playRound() {
    this.#cars.forEach((car) => {
      car.tryMoveWith(getRandomNumber());
    });

    this.#playRoundCalls += 1;

    this.#saveRoundHistory();
  }

  /**
   * 현재 라운드에서 우승한 자동차들을 저장한다.
   */
  #setWinners() {
    const maxPosition = Math.max(...this.#cars.map((car) => car.position));

    this.#winners = this.#cars.filter((car) => car.position === maxPosition);
  }

  /**
   * 1. TOTAL_GAME_ROUNDS만큼 게임을 진행한다.
   * 2. 모든 게임 진행 후, 우승자를 선정한다.
   */
  play() {
    while (this.#currRound <= TOTAL_GAME_ROUNDS) {
      this.#playRound();
      this.#currRound += 1;
    }

    this.#setWinners();
  }
}
