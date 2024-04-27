class Name {
  #name;

  static DEFAULT_MAX_NAME_LENGTH = 5;

  constructor(name, maxLen = Name.DEFAULT_MAX_NAME_LENGTH) {
    if (name.length > maxLen) {
      throw new TypeError('최대 길이를 초과하였습니다.');
    }
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export default Name;
