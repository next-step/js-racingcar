export class Name {
  #MIN_LENGTH = 1;
  #MAX_LENGTH = 5;

  #value;

  constructor(value) {
    this.#validate(value);
    this.#value = value;
  }

  #validate(value) {
    if (!value || value.length <= this.#MIN_LENGTH) {
      throw new Error('빈 값으로 생성할 수 없습니다.');
    }

    if (value.length > this.#MAX_LENGTH) {
      throw new Error(`${this.#MAX_LENGTH}자 이상의 이름을 생성할 수 없습니다.`);
    }
  }

  get value() {
    return this.#value;
  }
  
}
