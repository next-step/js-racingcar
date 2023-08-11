import * as readline from "node:readline/promises";

export default class RacingGameViewer {
  #CAR_NAME_INPUT_GUIDE =
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";
  #RACING_ROUND_INPUT_GUIDE = "시도할 회수는 몇회인가요?\n";
  #RACING_SCORE_CHAR = "-";
  #WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";
  #ROUND_HEADER_MESSAGE = "\n실행결과";
  #WINNER_SEPARATOR_CHAR = ",";

  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getUserInput(question) {
    return this.readline.question(question);
  }

  getRoundNumberInput() {
    return this.getUserInput(this.#RACING_ROUND_INPUT_GUIDE);
  }

  getCarNamesInput() {
    return this.getUserInput(this.#CAR_NAME_INPUT_GUIDE);
  }

  printContent(content) {
    console.log(content);
  }

  printCarStatus(carStatus) {
    const result = carStatus
      .map(
        (car) =>
          `${car.name} : ${this.#RACING_SCORE_CHAR.repeat(car.distance)}`,
      )
      .join("\n");

    this.printContent(result);
  }

  printWinners(winners) {
    this.printContent(
      `${winners.join(this.#WINNER_SEPARATOR_CHAR)}${
        this.#WINNER_ANNOUNCEMENT_MESSAGE
      }`,
    );
  }

  printRoundHeader() {
    this.printContent(this.#ROUND_HEADER_MESSAGE);
  }

  closeViewer() {
    this.readline.close();
  }
}
