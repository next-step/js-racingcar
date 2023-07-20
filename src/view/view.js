const readline = require('readline');
const { MESSAGES } = require('../constants.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class View {
  static getUserInput(callback) {
    rl.question(MESSAGES.ENTER_THE_CARS, callback);
  }

  static renderStartComment() {
    console.log(MESSAGES.START);
  }

  static renderCarDistance(name, distance) {
    const output = MESSAGES.carsDistance(name, distance);
    console.log(output);
  }

  static renderLineBreak() {
    console.log('\n');
  }

  static renderResult(names) {
    console.log(MESSAGES.winners(names));
  }
}

module.exports = View;
