import * as readline from "readline";

export default class RacingGameViewer {
  constructor() {
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdin,
    });
  }

  async getUserInput(question) {
    return new Promise((resolve) => {
      this.readline.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  printContent(content) {
    console.log(content);
  }
}
