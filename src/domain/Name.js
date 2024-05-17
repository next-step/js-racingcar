import ThrowMessage from '../utils/ThrowMessage';

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
    new ThrowMessage(name)
      .isString()
      .regex(regex)
      .minLength(minLen)
      .maxLength(maxLen);

    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export default Name;
