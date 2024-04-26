import { INPUT_MESSAGES } from "./constants/messages";
import { Console } from "./utils/readlinePromise";
import { car } from "./validator/car";

class App {
  constructor() {
    this.carNames = [];
  }

  async #carNamesSplit() {
    const carNames = await Console.input(INPUT_MESSAGES.START_MESSAGE);
    return carNames.split(",").map((carName) => carName.trim());
  }

  async init() {
    try {
      const carNames = await this.#carNamesSplit();
      car.nameLengthValidator(carNames);
    } catch (error) {
      Console.print(error.message);
      return Console.exit();
    }
  }
}

const app = new App();

app.init();
