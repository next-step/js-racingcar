import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { ALERT_MESSAGE, CAR_CONFIGURE } from '../constants/index';
import { printMessage, validateDuplicateCars, validatePromptListenerType, validateInputMessage } from '../race/index';

export default class CarPrompter {
  #readline = readline.createInterface({ input, output });

  #readInputCars(listenerCallback) {
    this.#readline.question(`${ALERT_MESSAGE.INPUT_CAR_MESSAGE}\n`, (inputMessage) => {
      try {
        this.#validateInputMessage(inputMessage);
        const cars = CarPrompter.separateCars(inputMessage, CAR_CONFIGURE.NAME_SEPARATOR);
        this.#validateDuplicateCars(cars);
        listenerCallback(cars);
        this.#readline.close();
      } catch (error) {
        printMessage(error);
        printMessage(ALERT_MESSAGE.RETRY_MESSAGE);
        this.#readInputCars(listenerCallback);
      }
    });
  }
  static separateCars = (inputCars, separator) => inputCars.split(separator);

  #validateInputMessage = validateInputMessage;
  #validateDuplicateCars = validateDuplicateCars;

  executeReadInput(listenerCallback) {
    validatePromptListenerType(listenerCallback);
    this.#readInputCars(listenerCallback);
  }
}
