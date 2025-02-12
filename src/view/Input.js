import { ERROR_MESSAGES } from "../utils/constants.js";
import readLineAsync from "../utils/readline.js";

class Input {
  async askCarNames() {
    try {
      const input = await readLineAsync("자동차 이름을 입력하세요. \n");
      const carNames = this.splitBy(input, ",");

      if (!this.validateNotSpace(carNames)) {
        throw new Error(ERROR_MESSAGES.NOT_SPACE_IN_NAME);
      }

      return carNames;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INPUT_ASYNC_ERROR);
    }
  }

  splitBy(string, separator) {
    return string.split(separator).map((name) => name.trim());
  }

  validateNotSpace(names) {
    return names.every((name) => !name.includes(" "));
  }
}

export default Input;
