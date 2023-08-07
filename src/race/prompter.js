import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { isOnlyNumber, isString, splitString, isFunction } from '../utils/index';
import { ALERT_MESSAGE, ERROR_MESSAGE, CAR_CONFIGURE } from '../constants/index';
import { printMessage } from './viewer';

const readlineInterface = readline.createInterface({ input, output });

const { INPUT_CAR_MESSAGE, RETRY_MESSAGE, QUESTION_RACE_LAP_MESSAGE } = ALERT_MESSAGE;
const { NOT_RECEIVED_FUNCTION, NOT_RECEIVED_INPUT, INVALID_NUMBER } = ERROR_MESSAGE;

const validatePromptListenerType = (listener) => {
  if (!isFunction(listener)) {
    throw new Error(NOT_RECEIVED_FUNCTION);
  }
};

const isValidInputMessage = (inputMessage) => isString(inputMessage) && inputMessage.trim();
const convertInputMessageToArray = (inputMessage) => splitString(inputMessage, CAR_CONFIGURE.NAME_SEPARATOR);

const readInputMessage = ({ question, error }, validator) =>
  new Promise((resolve, reject) => {
    readlineInterface.question(`${question}\n`, (inputMessage) => {
      if (validator && validator(inputMessage)) {
        resolve(inputMessage);
      }
      reject(new Error(error));
    });
  });

const executeReadInput = async (listener) => {
  try {
    const inputCars = await readInputMessage(
      {
        question: INPUT_CAR_MESSAGE,
        error: NOT_RECEIVED_INPUT
      },
      isValidInputMessage
    );
    const inputRaceLap = await readInputMessage(
      {
        question: QUESTION_RACE_LAP_MESSAGE,
        error: INVALID_NUMBER
      },
      isOnlyNumber
    );

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
