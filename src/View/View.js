import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MESSAGES = Object.freeze({
  INIT_GUIDE:
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분).\n",
  RESULT_GUIDE: "실행 결과",
  WINNER_POSTFIX: "가 최종 우승했습니다.",
  ERROR_PREFIX: "[ERROR]",
});

export default class View {
  handleInputWith(cbFunc) {
    rl.question(MESSAGES.INIT_GUIDE, (input) => {
      cbFunc(input);
      rl.close();
    });
  }

  #log(...rest) {
    return console.log(...rest);
  }

  #logDivider() {
    const DIVIDER_SYM = "";
    this.#log(DIVIDER_SYM);
  }

  #logCarStatus(car) {
    const DISTANCE_SYM = "-";
    const SPLIT_SYM = " : ";

    this.#log(`${car.name}${SPLIT_SYM}${DISTANCE_SYM.repeat(car.position)}`);
  }

  logErrorMessage(errorMsg) {
    this.#log(MESSAGES.ERROR_PREFIX, errorMsg);
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
    const SEPARATOR_SYM = ", ";
    const winnerNames = winners.map((winner) => winner.name);

    this.#log(winnerNames.join(SEPARATOR_SYM) + MESSAGES.WINNER_POSTFIX);
  }
}
