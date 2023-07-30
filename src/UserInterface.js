import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default class UserInterface {
  readLineWith(guideMsg, cbFunc) {
    rl.question(guideMsg, (carNames) => {
      cbFunc(carNames);
      rl.close();
    });
  }
}
