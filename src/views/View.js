import { ERROR_CODES, ERROR_MESSAGES } from "../constants";
import { ViewError } from "../domain/errors";
import { readLineAsync } from "../utils";

export class View {
  static async readLine(message) {
    return await readLineAsync(message);
  }

  static async getCarNamesPrompt() {
    while (true) {
      try {
        const input = await View.readLine(
          "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
        );

        if (!input) {
          throw new ViewError(ERROR_CODES.ERROR_EMPTY_CAR_NAME);
        }

        return input;
      } catch (error) {
        this.printError(error);
      }
    }
  }

  static async getRaceRoundPrompt() {
    while (true) {
      try {
        const input = await readLineAsync("시도할 회수는 몇회인가요?\n");

        if (!input) {
          throw new ViewError(ERROR_CODES.ERROR_EMPTY_RACE_ROUND);
        }

        return Number(input);
      } catch (error) {
        this.printError(error);
      }
    }
  }

  static printRoundStart() {
    console.log("\n실행 결과");
  }

  static printRaceResult(cars) {
    cars.forEach((car) => {
      console.log(`${car.name} : ${"-".repeat(car.position)}`);
    });
    console.log("");
  }

  static printWinners(winners) {
    console.log(
      `${winners.map((car) => car.name).join(", ")}가 최종 우승했습니다.`
    );
  }

  static printError(error) {
    console.log(ERROR_MESSAGES[error.message] || ERROR_MESSAGES.ERROR_UNKOWN);
  }
}
