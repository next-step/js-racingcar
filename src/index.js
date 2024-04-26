import { INPUT_MESSAGES } from "./constants/messages";
import { Console, ReadlinePromise } from "./utils/readlinePromise";

class App {
  constructor() {
    this.carNames = [];
  }

  async #carNamesSplit() {
    const carNames = await Console.input(INPUT_MESSAGES.START_MESSAGE);
    return carNames.split(",");
  }

  async init() {
    const carNames = await this.#carNamesSplit();
  }
}

const app = new App();

app.init();
