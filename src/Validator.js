const { ERROR_MESSAGES } = require('./constants/messages.js');
const { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MAX_USER_COUNT, MIN_USER_COUNT } = require('./constants/racing-rule.js');

const isOverMaxValue = (value, maxCount, message) => {
  if (value > maxCount) throw new Error(message);
};

const isUnderMinValue = (value, minCount, message) => {
  if (value < minCount) throw new Error(message);
};

const hasDuplicated = (names) => {
  const hasDuplicatedNames = new Set(names).size !== names.length;
  if (hasDuplicatedNames) throw new Error(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
};

class Validator {
  static isValidList(names) {
    isOverMaxValue(names.length, MAX_USER_COUNT, ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
    isUnderMinValue(names.length, MIN_USER_COUNT, ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
    hasDuplicated(names);
  }

  static isValidName(name) {
    isOverMaxValue(name.length, MAX_NAME_LENGTH, ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
    isUnderMinValue(name.length, MIN_NAME_LENGTH, ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  }
}

module.exports = Validator;
