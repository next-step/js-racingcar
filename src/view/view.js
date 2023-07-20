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

  static renderCarDistance(name, distance) {
    const output = MESSAGES.carsDistance(name, distance);
    console.log(output);
  }

  static renderResult() {}
}

module.exports = View;
