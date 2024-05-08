import { readLineAsync } from "./utils/readline.js";
import { validateCarName } from "./domain/car/car.contract.js";
import { validateRacingRound } from "./domain/racing/racing.contract.js";

const POSITION_MARKER = "-";

export class View {
  async inputCarNames() {
    try {
      const inputtedString = await readLineAsync(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분):\n"
      );
      const carNameList = inputtedString.split(",").map((name) => name.trim());

      carNameList.forEach((name) => validateCarName(name));

      return carNameList;
    } catch (error) {
      console.error(error.message);
      return await this.inputCarNames();
    }
  }

  async inputRacingRound() {
    try {
      const inputtedString = await readLineAsync("시도할 회수는 몇회인가요?\n");
      const racingRound = Number(inputtedString);

      validateRacingRound(racingRound);

      return racingRound;
    } catch (error) {
      console.error(error.message);
      return await this.inputRacingRound();
    }
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
