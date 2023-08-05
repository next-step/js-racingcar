import { stdin as input, stdout as output } from 'process';
import readline from 'readline';

export const manipulateReadline = {
  rl: readline.createInterface({
    input,
    output,
  }),

  questionReadline(prompt, validator) {
    return new Promise((resolve) => {
      const question = () => {
        this.rl.question(`${prompt}\n`, (answer) => {
          try {
            validator(answer);
            resolve(answer);
          } catch (error) {
            console.log(error.message);
            question();
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
