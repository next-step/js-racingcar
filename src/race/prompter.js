import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { isString, splitString, isFunction } from '../utils/index';
import { ALERT_MESSAGE, ERROR_MESSAGE, CAR_CONFIGURE } from '../constants/index';
import { printMessage } from './viewer';

const { INPUT_CAR_MESSAGE, RETRY_MESSAGE } = ALERT_MESSAGE;
const { NOT_RECEIVED_FUNCTION, NOT_RECEIVED_INPUT } = ERROR_MESSAGE;

const readlineInterface = readline.createInterface({ input, output });
const validatePromptListenerType = (listener) => {
  if (!isFunction(listener)) {
    throw new Error(NOT_RECEIVED_FUNCTION);
  }
};
const isValidInputMessage = (inputMessage) => isString(inputMessage) && inputMessage.trim();
const convertInputMessageToArray = (inputMessage) => splitString(inputMessage, CAR_CONFIGURE.NAME_SEPARATOR);

const readInputMessage = (message) =>
  new Promise((resolve, reject) => {
    readlineInterface.question(message, (inputMessage) => {
      if (isValidInputMessage(inputMessage)) {
        resolve(convertInputMessageToArray(inputMessage));
      }
      reject(new Error(NOT_RECEIVED_INPUT));
    });
  });

const executeReadInput = async (listener) => {
  try {
    const inputMessage = await readInputMessage(INPUT_CAR_MESSAGE);
    validatePromptListenerType(listener);
    listener(inputMessage);
  } catch (error) {
    printMessage(error);
    printMessage(RETRY_MESSAGE);
    await executeReadInput(listener);
  } finally {
    readlineInterface.close();
  }
};

export default executeReadInput;
