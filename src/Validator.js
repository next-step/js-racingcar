const { ERROR_MESSAGES } = require('./constants/messages.js');
const {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  MAX_USER_COUNT,
  MIN_USER_COUNT,
  MAX_ROUND_COUNT,
  MIN_ROUND_COUNT,
} = require('./constants/racing-rule.js');

const isOverMaxCarName = (name) => Number(name) > MAX_NAME_LENGTH;

const isUnderMinCarName = (name) => Number(name) < MIN_NAME_LENGTH;

const isOverMaxUserCount = (count) => Number(count) > MAX_USER_COUNT;

const isUnderMinUserCount = (count) => Number(count) < MIN_USER_COUNT;

const isOverMaxRound = (count) => Number(count) > MAX_ROUND_COUNT;

const isUnderMinRound = (count) => Number(count) < MIN_ROUND_COUNT;

const isDuplication = (names) => new Set(names).size !== names.length;

const isEmpty = (value) => value.length === 0;

const isIsNumber = (value) => Number.isNaN(+value);

const validator = Object.freeze({
  checkValidCarList: (names) => {
    if (isOverMaxUserCount(names.length)) {
      throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_USER_COUNT);
    }
    if (isUnderMinUserCount(names.length)) {
      throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_USER_COUNT);
    }
    if (isDuplication(names)) {
      throw new Error(ERROR_MESSAGES.HAS_DUPLICATED_NAME);
    }
  },

  checkValidCarName: (name) => {
    if (isOverMaxCarName(name.length)) {
      throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_NAME_LENGTH);
    }
    if (isUnderMinCarName(name.length)) {
      throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_NAME_LENGTH);
    }
  },

  checkValidRound: (round) => {
    if (isEmpty(round)) {
      throw new Error(ERROR_MESSAGES.IS_EMPTY);
    }
    if (isIsNumber(round)) {
      throw new Error(ERROR_MESSAGES.IS_NOT_NUMBER);
    }
    if (isOverMaxRound(round)) {
      throw new Error(ERROR_MESSAGES.MORE_THAN_MAX_ROUND_COUNT);
    }
    if (isUnderMinRound(round)) {
      throw new Error(ERROR_MESSAGES.LESS_THAN_MIN_ROUND_COUNT);
    }
  },
});

module.exports = validator;
