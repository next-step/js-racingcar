import { MAX_NAME_LENGTH } from '../constants';

class Name {
  #name;

  constructor(name, maxLen = MAX_NAME_LENGTH) {
    if (name.length > maxLen) {
      throw new TypeError('최대 길이를 초과하였습니다.');
    }
    this.#name = name;
  }

  getName() {
    return this.#name;
  }
}

export default Name;
