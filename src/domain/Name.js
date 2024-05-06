import { ERROR_MESSAGE } from '../constnats';

class Name {
  #name;

  static DEFAULT_OPTIONS = {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 5,
    REGEX: '^[a-zA-Z가-힣]+$',
  };

  constructor(
    name,
    {
      maxLen = Name.DEFAULT_OPTIONS.MAX_NAME_LENGTH,
      minLen = Name.DEFAULT_OPTIONS.MIN_NAME_LENGTH,
      regex = Name.DEFAULT_OPTIONS.REGEX,
    } = Name.DEFAULT_OPTIONS
  ) {
    if (!(typeof name === 'string')) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (!new RegExp(regex, 'g').test(name)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_NAME_FORMAT);
    }
    if (name.length < minLen) {
      throw new TypeError(ERROR_MESSAGE.MIN_LENGTH);
    }
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
