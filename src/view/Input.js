import { ERROR_MESSAGES } from "../utils/constants.js";
import readLineAsync from "../utils/readline.js";

class Input {
  async getCarNames() {
    try {
      const input = await readLineAsync(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분). \n"
      );
      const carNames = this.splitBy(input, ",");

      if (!this.isValidNotSpace(carNames)) {
        throw new Error(ERROR_MESSAGES.NOT_SPACE_IN_NAME);
      }

      return carNames;
    } catch (error) {
      throw new Error(ERROR_MESSAGES.INPUT_ASYNC_ERROR);
    }
  }

  async getRoundCount() {
    const input = await readLineAsync("시도할 회수는 몇회인가요? \n");

    if (!this.isValidInteger(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_RACE_COUNT);
    }

    return input;
  }

  splitBy(string, separator) {
    return string.split(separator).map((name) => name.trim());
  }

  isValidNotSpace(names) {
    return names.every((name) => !name.includes(" "));
  }

  isValidInteger(value) {
    const number = parseFloat(value);
    return !isNaN(number) && number > 0 && Number.isInteger(number);
  }
}

export default Input;
