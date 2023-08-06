import * as readline from "readline";

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

  async getUserInput(question) {
    return await this.readline.question(question);
  }

  printCarStatus(carStatus) {
    const result = [...carStatus.keys()]
      .map(
        (car) =>
          `${car} : ${RACING_SCORE_CHAR.repeat(carStatus.get(car).distance)}`,
      )
      .join("\n");
    this.printContent(result);
  }

  printWinners(winners) {
    this.printContent(`${winners.join(",")}${WINNER_ANNOUNCEMENT_MESSAGE}`);
  }

  printRoundHeader() {
    this.printContent(ROUND_HEADER_MESSAGE);
  }

  printContent(content) {
    console.log(content);
  }

  closeViewer() {
    this.readline.close();
  }
}
