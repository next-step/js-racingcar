import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { ALERT_MESSAGE, ERROR_MESSAGE, NAME_CONFIGURE } from '../constants/index';
import { validateInputToCarRacers, isFunction } from '../utils/index';

export default class CarPrompter {
  #readline = readline.createInterface({ input, output });

  #readInputCars(listenerCallback) {
    this.#readline.question(`${ALERT_MESSAGE.INPUT_CAR_MESSAGE}\n`, (inputMessage) => {
      CarPrompter.validate(inputMessage);
      listenerCallback(inputMessage.split(NAME_CONFIGURE.SEPARATOR));
      this.#readline.close();
    });
  }

  static validate = validateInputToCarRacers;

  executeReadInput(listenerCallback) {
    if (!isFunction(listenerCallback)) {
      throw new Error(ERROR_MESSAGE.NOT_RECEIVED_FUNCTION);
    }
    this.#readInputCars(listenerCallback);
  }
}
