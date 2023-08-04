const { ERROR_MESSAGES } = require('./constants/messages.js');
const {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MAX_USER_COUNT,
  MIN_USER_COUNT,
  MAX_ROUND_COUNT,
  MIN_ROUND_COUNT,
} = require('./constants/racing-rule.js');

const checkOverMaxCarName = (name) => {
  if (Number(name) > MAX_NAME_LENGTH) {
    throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
  }
};

const checkUnderMinCarName = (name) => {
  if (Number(name) < MIN_NAME_LENGTH) {
    throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
  }
};

const checkOverMaxUserCount = (count) => {
  if (Number(count) > MAX_USER_COUNT) {
    throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
  }
};
const checkUnderMinUserCount = (count) => {
  if (Number(count) < MIN_USER_COUNT) {
    throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
  }
};

const checkOverMaxRound = (count) => {
  if (Number(count) > MAX_ROUND_COUNT) {
    throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_ROUND_COUNT);
  }
};
const checkUnderMinRound = (count) => {
  if (Number(count) < MIN_ROUND_COUNT) {
    throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_ROUND_COUNT);
  }
};

const checkDuplication = (names) => {
  const checkDuplicationNames = new Set(names).size !== names.length;
  if (checkDuplicationNames) {
    throw new Error(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
  }
};

class Validator {
  static checkValidCarList(names) {
    checkOverMaxUserCount(names.length);
    checkUnderMinUserCount(names.length);
    checkDuplication(names);
  }

  static checkValidCarName(name) {
    checkOverMaxCarName(name.length);
    checkUnderMinCarName(name.length);
  }

  static checkValidRound(round) {
    checkOverMaxRound(round);
    checkUnderMinRound(round);
  }
}

module.exports = Validator;
