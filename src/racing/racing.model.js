import { CarModel } from "../car";
import { readLineAsync } from "../utils/readline";

const INITIAL_ROUND = 0;
const INITIAL_CAR_LIST = [];
const INITIAL_WINNER_LIST = [];

const RACING_ROUND = 5;

const SETUP_MESSAGE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).";

export class Racing {
  #round;
  #carList;
  #winnerList;

  constructor() {
    this.#round = INITIAL_ROUND;
    this.#carList = INITIAL_CAR_LIST;
    this.#winnerList = INITIAL_WINNER_LIST;
  }

  async setup() {
    const inputtedValue = await readLineAsync(SETUP_MESSAGE);
    const carNameList = inputtedValue
      .split(",")
      .map((carName) => carName.trim());

    this.#carList = carNameList.map(
      (carName) => new CarModel.Car({ name: carName })
    );
  }

  start() {
    while (this.#round < RACING_ROUND) {
      this.#round++;
    }
  }

  get round() {
    return this.#round;
  }
}
