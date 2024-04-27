import { ERROR_MESSAGES } from "../constants";
import { readLineAsync } from "../utils";

export class View {
  static async readLine(message) {
    return await readLineAsync(message);
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
      `${winners.map((car) => car.getName()).join(", ")}가 최종 우승했습니다.`
    );
  }

  static printError(error) {
    console.log(ERROR_MESSAGES[error.message] || ERROR_MESSAGES.ERROR_UNKOWN);
  }
}
