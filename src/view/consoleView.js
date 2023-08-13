import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export class ConsoleView {
  #rl;

  constructor() {
    this.#rl = readline.createInterface({ input, output });
  }

  async prompt(text) {
    return await this.#rl.question(text);
  }

  print(message) {
    console.log(message);
  }

  close() {
    this.#rl?.close();
  }
}
