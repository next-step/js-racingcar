import { ERROR_MESSAGE } from '../constnats';

class Name {
  #name;

  static DEFAULT_MAX_NAME_LENGTH = 5;

  constructor(name, maxLen = Name.DEFAULT_MAX_NAME_LENGTH) {
    if (name.length > maxLen) {
      throw new TypeError(ERROR_MESSAGE.MAX_LENGTH);
    }
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export default Name;
