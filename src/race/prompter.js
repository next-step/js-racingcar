import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { splitString, isFunction } from '../utils/index';
import { ALERT_MESSAGE, ERROR_MESSAGE, CAR_CONFIGURE } from '../constants/index';
import { printMessage } from './viewer';

const readlineInterface = readline.createInterface({ input, output });

const { INPUT_CAR_MESSAGE, RETRY_MESSAGE, QUESTION_RACE_LAP_MESSAGE } = ALERT_MESSAGE;
const { NOT_RECEIVED_FUNCTION, NOT_RECEIVED_INPUT_CARS, NOT_RECEIVED_INPUT_LAP } = ERROR_MESSAGE;

const validatePromptListenerType = (listener) => {
  if (!isFunction(listener)) {
    throw new Error(NOT_RECEIVED_FUNCTION);
  }
};

const convertInputMessageToArray = (inputMessage) => splitString(inputMessage, CAR_CONFIGURE.NAME_SEPARATOR);

const readInputMessage = (questionMessage, errorMessage) =>
  new Promise((resolve, reject) => {
    readlineInterface.question(`${questionMessage}\n`, (inputMessage) => {
      if (inputMessage.trim()) {
        resolve(inputMessage);
      }
      reject(new Error(errorMessage));
    });
  });

const executeReadInput = async (listener) => {
  try {
    const inputCars = await readInputMessage(INPUT_CAR_MESSAGE, NOT_RECEIVED_INPUT_CARS);
    const inputRaceLap = await readInputMessage(QUESTION_RACE_LAP_MESSAGE, NOT_RECEIVED_INPUT_LAP);

    validatePromptListenerType(listener);
    listener(convertInputMessageToArray(inputCars), Number(inputRaceLap));
  } catch (error) {
    printMessage(error);
    printMessage(RETRY_MESSAGE);
    await executeReadInput(listener);
  } finally {
    readlineInterface.close();
  }
};

export default executeReadInput;
