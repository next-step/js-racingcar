import { View } from "./View.js";
import { Racing } from "./domain/racing/racing.model.js";
import { Car } from "./domain/car/car.model.js";

import { generateRandomNumber } from "./utils/randomNumber.js";

const MOVE_THRESHOLD = 4;
const MOVE_MIN_NUMBER = 0;
const MOVE_MAX_NUMBER = 9;

export class App {
  #view;

  constructor() {
    this.#view = new View();
  }

  #movementRule() {
    return (
      generateRandomNumber(MOVE_MIN_NUMBER, MOVE_MAX_NUMBER) >= MOVE_THRESHOLD
    );
  }

  async main() {
    const carNames = await this.#view.inputCarNames();
    const racingRound = await this.#view.inputRacingRound();

    const carList = carNames.map((name) => new Car({ name }));
    const racing = new Racing({
      carList: carList,
      racingRound: racingRound,
      movementRule: this.#movementRule,
    });

    racing.start();

    this.#view.printCarPosition(racing.racingHistory);
    this.#view.printWinner(racing.winnerList);
  }
}

export const app = new App();
