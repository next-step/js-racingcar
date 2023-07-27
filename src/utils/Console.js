import readline from 'readline';
import { MESSAGE } from '../constants';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const Console = {
  readLine(question, callback) {
    rl.question(MESSAGE.ADD_NEW_LINE(question), (input) => {
      callback(input);
      rl.close();
    });
  },
  print(...message) {
    console.log(...message);
  },
};
