const readline = require('readline');
const { MESSAGES } = require('../constants/messages.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  static async getUserInput(question) {
    return new Promise((resolve) => {
      rl.question(question, (input) => {
        resolve(input);
      });
    });
  }

  static renderStartComment() {
    console.log(MESSAGES.COMMON.OUTCOME);
  }

  static renderCarDistance(car) {
    const output = MESSAGES.GAME.carsDistance(car);
    console.log(output);
  }

  static renderLineBreak() {
    console.log('');
  }

  static renderResult(names) {
    console.log(MESSAGES.RESULT.winners(names));
  }

  static renderError(err) {
    console.error(err);
  }
}

module.exports = View;
