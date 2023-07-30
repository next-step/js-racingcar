import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { ALERT_MESSAGE, NAME_CONFIGURE } from '../constants/index';
import { validateInputToCarRacers } from '../utils/index';

export default class CarPrompter {
  #readline = readline.createInterface({ input, output });

  #inputCarRacers(listenerCallback) {
    this.#readline.question(`${ALERT_MESSAGE.INPUT_CAR_MESSAGE}\n`, (inputMessage) => {
      CarPrompter.validate(inputMessage);
      if (listenerCallback) {
        listenerCallback(inputMessage.split(NAME_CONFIGURE.SEPARATOR));
      }
      this.#readline.close();
    });
  }

  static validate = validateInputToCarRacers;

  execute = this.#inputCarRacers;
}
