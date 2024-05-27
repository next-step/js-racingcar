import prompt from "../../utils/prompt.js";

import { validateTotalRounds } from "./racing.contract.js";

const TOTAL_ROUNDS_INPUT_MESSAGE = "시도할 횟수는 몇회인가요?\n";
const DECIMAL_RADIX = 10;

class RacingView {
  async inputTotalRounds() {
    const message = TOTAL_ROUNDS_INPUT_MESSAGE;
    const format = (input) => parseInt(input, DECIMAL_RADIX);
    const validate = validateTotalRounds;

    return await prompt({ message, validate, format });
  }

  printWinners(winnerCars) {
    const winnerNames = winnerCars.map((car) => car.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }
}

export default RacingView;
