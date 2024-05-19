import { validateCarName } from "../domain/car/car.contract.js";
import { validateTotalRounds } from "../domain/racing/racing.contract.js";
import prompt from "../utils/prompt.js";

const CAR_NAME_INPUT_MESSAGE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)\n";
const TOTAL_ROUNDS_INPUT_MESSAGE = "시도할 횟수는 몇회인가요?\n";
const DECIMAL_RADIX = 10;

class InputView {
  async inputCarNames() {
    const message = CAR_NAME_INPUT_MESSAGE;
    const format = (input) => input.split(",").map((name) => name.trim());
    const validate = (carNames) =>
      carNames.map((name) => validateCarName(name));

    return await prompt({ message, validate, format });
  }

  async inputTotalRounds() {
    const message = TOTAL_ROUNDS_INPUT_MESSAGE;
    const format = (input) => parseInt(input, DECIMAL_RADIX);
    const validate = validateTotalRounds;

    return await prompt({ message, validate, format });
  }
}

export default InputView;
