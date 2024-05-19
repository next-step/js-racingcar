import Car from "./domain/car/car.model.js";
import Racing from "./domain/racing/racing.model.js";
import { generateRandomNumber } from "./utils/randomNumber.js";
import InputView from "./view/input.js";
import OutputView from "./view/output.js";

const MOVE_THRESHOLD = 4;
const MOVE_MIN_NUMBER = 0;
const MOVE_MAX_NUMBER = 9;

export class App {
  #inputView;
  #outputView;

  constructor() {
    this.#inputView = new InputView();
    this.#outputView = new OutputView();
  }

  #movementRule() {
    return (
      generateRandomNumber(MOVE_MIN_NUMBER, MOVE_MAX_NUMBER) >= MOVE_THRESHOLD
    );
  }

  async main() {
    const carNames = await this.#inputView.inputCarNames();
    const totalRounds = await this.#inputView.inputTotalRounds();

    const cars = carNames.map((name) => new Car({ name }));
    const racing = new Racing({
      cars,
      totalRounds,
      movementRule: this.#movementRule,
    });

    racing.start();

    this.#outputView.printCarsPosition(racing.history);
    this.#outputView.printWinners(racing.winners);
  }
}

export const app = new App();
