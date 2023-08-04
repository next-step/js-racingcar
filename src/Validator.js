const { ERROR_MESSAGES } = require('./constants/messages.js');
const {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MAX_USER_COUNT,
  MIN_USER_COUNT,
  MAX_ROUND_COUNT,
  MIN_ROUND_COUNT,
} = require('./constants/racing-rule.js');

const checkOverMaxValue = (value, maxCount, message) => {
  if (Number(value) > maxCount) throw new Error(message);
};

const checkUnderMinValue = (value, minCount, message) => {
  if (Number(value) < minCount) throw new Error(message);
};

const checkDuplication = (names) => {
  const checkDuplicationNames = new Set(names).size !== names.length;
  if (checkDuplicationNames) throw new Error(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
};

class Validator {
  static checkValidCarList(names) {
    checkOverMaxValue(names.length, MAX_USER_COUNT, ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
    checkUnderMinValue(names.length, MIN_USER_COUNT, ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
    checkDuplication(names);
  }

  static checkValidCarName(name) {
    checkOverMaxValue(name.length, MAX_NAME_LENGTH, ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
    checkUnderMinValue(name.length, MIN_NAME_LENGTH, ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  }

  static checkValidRound(round) {
    checkOverMaxValue(round, MAX_ROUND_COUNT, ERROR_MESSAGES.MORE_THAN_MAX_ROUND_COUNT);
    checkUnderMinValue(round, MIN_ROUND_COUNT, ERROR_MESSAGES.LESS_THAN_MIN_ROUND_COUNT);
  }
}

module.exports = Validator;
