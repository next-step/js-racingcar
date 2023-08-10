import * as readline from "node:readline/promises";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const RACING_ROUND_INPUT_GUIDE = "시도할 회수는 몇회인가요?\n";

const RACING_SCORE_CHAR = "-";

const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";

const ROUND_HEADER_MESSAGE = "\n실행결과";

export default class RacingGameViewer {
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
    return this.getUserInput(RACING_ROUND_INPUT_GUIDE);
  }

  getCarNamesInput() {
    return this.getUserInput(CAR_NAME_INPUT_GUIDE);
  }

  printContent(content) {
    console.log(content);
  }

  printCarStatus(carStatus) {
    const result = carStatus
      .map((car) => `${car.name} : ${RACING_SCORE_CHAR.repeat(car.distance)}`)
      .join("\n");

    this.printContent(result);
  }

  printWinners(winners) {
    this.printContent(`${winners.join(",")}${WINNER_ANNOUNCEMENT_MESSAGE}`);
  }

  printRoundHeader() {
    this.printContent(ROUND_HEADER_MESSAGE);
  }

  closeViewer() {
    this.readline.close();
  }
}
