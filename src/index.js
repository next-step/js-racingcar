import { INPUT_MESSAGES } from "./constants/messages";
import { Console } from "./utils/readlinePromise";
import { splitByComma } from "./utils/splitByComma";
import { car } from "./validator/car";

class App {
  constructor() {
    this.carNames = [];
  }

  async #carNameStage() {
    const carNames = await Console.input(INPUT_MESSAGES.START_MESSAGE);
    const carNamesSplitByComma = splitByComma(carNames);
    car.nameLengthValidator(carNamesSplitByComma);
    return carNamesSplitByComma;
  }

  async init() {
    try {
      const carNamesArray = await this.#carNameStage();
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
