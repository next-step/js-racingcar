class Name {
  #name;
  constructor(name, maxLen = 5) {
    if (name.length > maxLen) {
      throw new Error('최대 길이를 초과하였습니다.');
    }
    this.#name = name;
  }
  getName() {
    return this.#name;
  }
}

export default Name;
