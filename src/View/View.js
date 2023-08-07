import { rl } from "../utils";

export default class View {
  static MESSAGES = Object.freeze({
    INITIAL_GUIDE:
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n",
    RESULT_GUIDE: "실행 결과",
  });

  addEventHandlerToPrompt(cbFunc) {
    rl.question(MESSAGES.INITIAL_GUIDE, (input) => {
      cbFunc(input);
      rl.close();
    });
  }

  #log(...rest) {
    return console.log(...rest);
  }

  #logDivider() {
    const DIVIDER_SYMBOL = "";
    this.#log(DIVIDER_SYMBOL);
  }

  #logCarStatus(car) {
    this.#log(`${car.name} : ${"-".repeat(car.position)}`);
  }

  logErrorMessage(errorMsg) {
    this.#log("[ERROR]", errorMsg);
  }

  logResultGuideMessage() {
    this.#logDivider();

    this.#log(MESSAGES.RESULT_GUIDE);
  }

  logRoundStatus(cars) {
    cars.forEach((car) => {
      this.#logCarStatus(car);
    });

    this.#logDivider();
  }

  logWinners(winners) {
    const winnerNames = winners.map((winner) => winner.name);

    this.#log(winnerNames.join(", ") + "가 최종 우승했습니다.");
  }
}
