import prompt from "../../utils/prompt.js";

import { validateRacingRound } from "./racing.contract.js";

const RACING_ROUND_INPUT_MESSAGE = "시도할 횟수는 몇회인가요?\n";
const DECIMAL_RADIX = 10;

class RacingView {
  async inputRacingRound() {
    const message = RACING_ROUND_INPUT_MESSAGE;
    const format = (input) => parseInt(input, DECIMAL_RADIX);
    const validate = validateRacingRound;

    return await prompt({ message, validate, format });
  }

  printWinners(winnerCarList) {
    const winnerNames = winnerCarList.map((car) => car.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }
}

export default RacingView;
