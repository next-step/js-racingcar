import readline from 'readline';
import { MESSAGE } from '../constants';

export const Console = {
  rl: readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }),

  readLine(question) {
    return new Promise((resolve) => {
      this.rl.question(MESSAGE.ADD_NEW_LINE(question), (input) => {
        resolve(input);
      });
    });
  },

  close() {
    this.rl.close();
  },

  print(...message) {
    console.log(...message);
  },
};
