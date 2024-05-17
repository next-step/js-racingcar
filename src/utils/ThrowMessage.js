import { ERROR_MESSAGE } from '../constnats';

class ThrowMessage {
  #value;
  constructor(value) {
    this.#value = value;
  }

  isString() {
    if (!(typeof this.#value === 'string')) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }

  isArray() {
    if (!Array.isArray(this.#value)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }

  regex(regex) {
    if (!new RegExp(regex, 'g').test(this.#value)) {
      throw new TypeError(ERROR_MESSAGE.INVALID_NAME_FORMAT);
    }
    return this;
  }

  minLength(minLen) {
    if (this.#value.length < minLen) {
      throw new TypeError(ERROR_MESSAGE.MIN_LENGTH);
    }
    return this;
  }

  maxLength(maxLen) {
    if (this.#value.length > maxLen) {
      throw new TypeError(ERROR_MESSAGE.MAX_LENGTH);
    }
    return this;
  }

  min(minLen) {
    if (this.#value < minLen) {
      throw new TypeError(ERROR_MESSAGE.MIN_LENGTH);
    }
    return this;
  }

  max(maxLen) {
    if (this.#value > maxLen) {
      throw new TypeError(ERROR_MESSAGE.MAX_LENGTH);
    }
    return this;
  }

  maxSafeInteger() {
    if (this.#value > Number.MAX_SAFE_INTEGER) {
      throw TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }

  isInteger() {
    if (!Number.isInteger(this.#value)) {
      throw TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
  }

  isTruthy() {
    if (!this.#value) {
      throw TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    return this;
  }
}

export default ThrowMessage;
