import { INPUT_CAR_NAMES } from "../constants/Messages";

class ConsoleInput {
  #readline;

  constructor(readline) {
    this.#readline = readline;
  }

  readCarNames() {
    return this.#readline.question(`${INPUT_CAR_NAMES}\n`);
  }
}

export default ConsoleInput;
