const { MAX_NAME_LENGTH, MESSAGES } = require('./constants.js');

const checkValidNames = (arr) => {
  const set = new Set();
  arr.forEach((name) => {
    if (name.length > MAX_NAME_LENGTH) throw new Error(MESSAGES.ERROR.OVER_MAX_LENGTH);
    set.add(name);
  });
  const isExistName = set.size !== arr.length;
  if (isExistName) throw new Error(MESSAGES.ERROR.EXIST_NAME);
  if (arr.length < 1) throw new Error(MESSAGES.ERROR.INVALID_NAMES);
};

exports.checkValidNames = checkValidNames;
