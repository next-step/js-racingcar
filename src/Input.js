import readline from "readline";
import Car from "./domain/Car.js";

class Input {
  async askCarNames() {
    const input = await this.readLineAsync("자동차 이름을 입력하세요. \n");
    const carNames = input.split(",").map((name) => new Car(name.trim()));
    return carNames;
  }

  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error("arguments must be 1"));
      }

      if (typeof query !== "string") {
        reject(new Error("query must be string"));
      }

      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(query, (input) => {
        rl.close();
        resolve(input);
      });
    });
  }
}

export default Input;
