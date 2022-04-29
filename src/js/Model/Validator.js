import { MAX_CARNAME_LENGTH } from '../util/consts.js';

class Validator {
  static isEmpty(text) {
    return text.split(',').some((e) => !e.trim());
  }

  static isCorrectLength(text) {
    return text.split(',').some((e) => e.trim().length > MAX_CARNAME_LENGTH);
  }

  static isCorrectCount(text) {
    return Number(text) === 0;
  }
}

export default Validator;
