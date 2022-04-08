import { checkValidations } from './services/index.js';
import { pipe, trim, trimComma, split, removeSpace } from './helpers/index.js';
import { CONTROLL_KEY } from './constants.js';

const executor = {
  [CONTROLL_KEY.CAR_NAMES]: pipe(trim, trimComma, split, removeSpace, checkValidations),
  [CONTROLL_KEY.GAME]: pipe(),
  [CONTROLL_KEY.RESULT]: pipe(),
  [CONTROLL_KEY.RESET]: pipe(),
};

const validator = (controllKey, params) => {
  try {
    const execute = executor[controllKey];
    return execute(params);
  } catch (error) {
    alert(error.message);
    return null;
  }
};

export default validator;
