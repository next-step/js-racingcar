const readline = require('readline');
const { MESSAGES } = require('../constants/messages.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  static getUserInput(callback) {
    rl.question(MESSAGES.REQUEST.ENTER_THE_CARS, callback);
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
    console.log(err);
  }
}

module.exports = View;
