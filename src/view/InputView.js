import readline from "readline";

class InputView {
  async askCarNames() {
    return this.readLineAsync("경주할 자동차 이름을 입력하세요.\n").then(
      (input) => {
        return input.split(",").map((name) => name.trim());
      },
    );
  }

  async askRounds() {
    return this.readLineAsync("시도할 회수는 몇회인가요?\n").then((input) => {
      return Number(input);
    });
  }

  async readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readLine.question(query, (input) => {
        readLine.close();
        resolve(input);
      });
    });
  }
}

export default InputView;
