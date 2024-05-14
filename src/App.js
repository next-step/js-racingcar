import Car from "./domain/car/car.model.js";
import CarView from "./domain/car/car.view.js";
import Racing from "./domain/racing/racing.model.js";
import RacingView from "./domain/racing/racing.view.js";
import { generateRandomNumber } from "./utils/randomNumber.js";

const MOVE_THRESHOLD = 4;
const MOVE_MIN_NUMBER = 0;
const MOVE_MAX_NUMBER = 9;

export class App {
  #carView;
  #racingView;

  constructor() {
    this.#carView = new CarView();
    this.#racingView = new RacingView();
  }

  #movementRule() {
    return (
      generateRandomNumber(MOVE_MIN_NUMBER, MOVE_MAX_NUMBER) >= MOVE_THRESHOLD
    );
  }

  async main() {
    const carNames = await this.#carView.inputCarNames();
    const racingRound = await this.#racingView.inputRacingRound();

    const carList = carNames.map((name) => new Car({ name }));
    const racing = new Racing({
      carList: carList,
      racingRound: racingRound,
      movementRule: this.#movementRule,
    });

    racing.start();

    this.#carView.printCarsPosition(racing.racingHistory);
    this.#racingView.printWinners(racing.winnerList);
  }
}

export const app = new App();
