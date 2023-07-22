const { MESSAGES } = require('./constants/messages.js');
const { MAX_NAME_LENGTH, MIN_NAME_LENGTH, MAX_USER, MIN_USER } = require('./constants/racing-rule.js');

class Validator {
  static isValidNames(names) {
    this.isOverMaxUser(names);
    this.isUnderMaxUser(names);

    names.forEach((name) => {
      this.isUnderMaxLength(name);
      this.isOverMaxLength(name);
    });

    this.hasDuplicated(names);
  }

  static isOverMaxUser(names) {
    if (names.length > MAX_USER) throw new Error(MESSAGES.ERROR.MORE_THAN_MAX_USER);
  }

  static isUnderMaxUser(names) {
    if (names.length < MIN_USER) throw new Error(MESSAGES.ERROR.LESS_THAN_MIN_USER);
  }

  static isOverMaxLength(name) {
    if (name.length > MAX_NAME_LENGTH) throw new Error(MESSAGES.ERROR.MORE_THAN_MAX_NAME_LENGTH);
  }

  static isUnderMaxLength(name) {
    if (name.length < MIN_NAME_LENGTH) throw new Error(MESSAGES.ERROR.LESS_THAN_MIN_NAME_LENGTH);
  }

  static hasDuplicated(names) {
    const hasDuplicatedNames = new Set(names).size !== names.length;
    if (hasDuplicatedNames) throw new Error(MESSAGES.ERROR.HAS_DUPLICATED_NAME);
  }
}

module.exports = Validator;
