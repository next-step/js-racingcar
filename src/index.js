import { ERROR_CODES } from "./constants";
import { Race } from "./domain";
import { View } from "./views";
import { RandomMoveStrategy } from "./domain/strategies";

export class App {
  #race;
  #moveStrategy;

  constructor(moveStrategy) {
    this.#moveStrategy = moveStrategy;
  }

  async play() {
    try {
      const carNames = await this.#getCarNames();
      if (carNames.length === 0) return;

      this.#race = new Race(carNames, this.#moveStrategy);
      const result = this.#race.race();
      this.#render(result);
    } catch (error) {
      View.printError(error);
    }
  }

  async #getCarNames() {
    const namesInput = await View.readLine(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
    );
    if (!namesInput) {
      throw new Error(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
    }

    return namesInput.split(",").map((name) => name.trim());
  }

  #render(raceResult) {
    View.printRoundStart();
    raceResult.forEach((result) => {
      View.printRaceResult(result.cars);
    });
    View.printWinners(this.#race.getWinners());
  }

  getRace() {
    return this.#race;
  }
}

const app = new App(new RandomMoveStrategy());
app.play();
