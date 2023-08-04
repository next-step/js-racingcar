const readline = require('readline');
const { MESSAGES } = require('../constants/messages.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const view = Object.freeze({
  getUserInput: async (question) => {
    return new Promise((resolve) => {
      rl.question(question, (input) => {
        resolve(input);
      });
    });
  },

  renderStartComment: () => {
    console.log(MESSAGES.COMMON.OUTCOME);
  },

  renderCarDistance: (car) => {
    const output = MESSAGES.GAME.carsDistance(car);
    console.log(output);
  },

  renderLineBreak: () => {
    console.log('');
  },

  renderResult: (names) => {
    console.log(MESSAGES.RESULT.winners(names));
  },

  renderError: (err) => {
    console.error(err);
  },
});

module.exports = view;
