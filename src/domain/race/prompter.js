import { stdin as input, stdout as output } from 'process';
import * as readline from 'readline';
import { splitString } from '../../utils/string';
import { ALERT_MESSAGE, ERROR_MESSAGE, CAR_CONFIGURE } from '../constants/index';

const { INPUT_CAR_MESSAGE, RETRY_MESSAGE, QUESTION_RACE_LAP_MESSAGE } = ALERT_MESSAGE;
const { NOT_RECEIVED_INPUT_CARS, NOT_RECEIVED_INPUT_LAP } = ERROR_MESSAGE;

const readlineInterface = readline.createInterface({ input, output });

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

export const errorFallback = (error) => {
  console.error(error);
  console.error(RETRY_MESSAGE);
};

export const executeReadInputCar = async () => {
  try {
    const inputCars = await readInputMessage(INPUT_CAR_MESSAGE, NOT_RECEIVED_INPUT_CARS);
    return convertInputMessageToArray(inputCars);
  } catch (error) {
    errorFallback(error);
    return executeReadInputCar();
  }
};

export const executeReadInputTotalLap = async () => {
  try {
    const inputTotalLap = await readInputMessage(QUESTION_RACE_LAP_MESSAGE, NOT_RECEIVED_INPUT_LAP);
    return Number(inputTotalLap);
  } catch (error) {
    errorFallback(error);
    return executeReadInputTotalLap();
  }
};

export const endPrompter = () => {
  readlineInterface.close();
};
