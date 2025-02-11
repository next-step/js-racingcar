import { ERROR_MESSAGES } from "../src/utils/constants.js";
import readLineAsync from "../src/utils/readline.js";

class Input {
  async askCarNames() {
    const input = await readLineAsync("자동차 이름을 입력하세요. \n");
    const carNames = this.splitBy(input, ",");

    if (!this.validateNotSpace(carNames)) {
      throw new Error(ERROR_MESSAGES.NOT_SPACE_IN_NAME);
    }

    return carNames;
  }

  splitBy(string, separator) {
    return string.split(separator).map((name) => name.trim());
  }

  validateNotSpace(names) {
    return names.every((name) => !name.includes(" "));
  }
}

export default Input;
