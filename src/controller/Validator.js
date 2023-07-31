import { SETTINGS, MESSAGES } from '../constants/index.js';

export class Validator {
  maxNameLength = SETTINGS.NAME.MAX_LENGTH;
  minNameLength = SETTINGS.NAME.MIN_LENGTH;

  constructor() {}

  validateConditions(name) {
    this.validateNameMaxLength(name);
    this.validateNameMinLength(name);
    return true;
  }

  validateNameMaxLength(name) {
    if (name.length > this.maxNameLength) {
      throw new Error(MESSAGES.ERROR.MAX_NAME_LENGTH);
    }
  }

  validateNameMinLength(name) {
    if (name.length < SETTINGS.NAME.MIN_LENGTH) {
      throw new Error(MESSAGES.ERROR.MIN_NAME_LENGTH);
    }
  }
}
