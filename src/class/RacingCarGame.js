import * as readline from "readline";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

export default class RacingCarGame {
  constructor() {
    this.cars = new Map();
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_GUIDE, (answer) => {
      console.log(answer);
    });
  }
}
