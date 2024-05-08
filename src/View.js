import { validateCarName } from "./domain/car/car.contract.js";
import { validateRacingRound } from "./domain/racing/racing.contract.js";
import { readLineAsync } from "./utils/readline.js";

const POSITION_MARKER = "-";

export class View {
  async #prompt({ message, validate, format }) {
    try {
      const inputtedString = await readLineAsync(message);
      const formattedInput = format ? format(inputtedString) : inputtedString;

      validate && validate(formattedInput);

      return formattedInput;
    } catch (error) {
      console.error(error.message);
      return await this.#prompt({ message, validate, format });
    }
  }

  async inputCarNames() {
    const message =
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분):\n";
    const format = (input) => input.split(",").map((name) => name.trim());
    const validate = (carNameList) => {
      carNameList.forEach((name) => validateCarName(name));
    };

    return await this.#prompt({ message, validate, format });
  }

  async inputRacingRound() {
    const message = "시도할 횟수는 몇회인가요?\n";
    const format = Number;
    const validate = validateRacingRound;

    return await this.#prompt({ message, validate, format });
  }

  printWinner(winnerCarList) {
    const winnerNames = winnerCarList.map((car) => car.name).join(", ");
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  }

  printCarPosition(carList) {
    carList.forEach((car) => {
      console.log(`${car.name}: ${POSITION_MARKER.repeat(car.position)}`);
    });
  }
}
