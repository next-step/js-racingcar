import { stdin as input, stdout as output } from 'process';
import readline from 'readline';
import { ATTEMPT_MAX_NUMBER } from '../constants/settings.js';
import { MESSAGES } from '../constants/messages.js';

export const manipulateReadline = {
  rl: readline.createInterface({
    input,
    output,
  }),

  questionReadline(prompt, validator) {
    let attempt = 0;
    return new Promise((resolve) => {
      const question = () => {
        this.rl.question(`${prompt}\n`, (answer) => {
          try {
            validator(answer);
            resolve(answer);
          } catch (error) {
            attempt += 1;
            if (attempt === ATTEMPT_MAX_NUMBER) {
              console.log(MESSAGES.ERROR.MAX_ATTEMPT_EXCEEDED);
              this.closeReadline();
            } else {
              console.log(error.message);
              question();
            }
          }
        });
      };
      question();
    });
  },

  closeReadline() {
    this.rl.close();
  },
};
