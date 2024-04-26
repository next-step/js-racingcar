import readlinePromises from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export const Console = {
  rl: readlinePromises.createInterface({ input, output }),
  async input(question) {
    return await this.rl.question(question);
  },
  print(outputMessage) {
    console.log(outputMessage);
  },
  exit() {
    return this.rl.close();
  },
};
