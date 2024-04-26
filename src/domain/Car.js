export default class Car {
  // 이름
  #name;

  constructor(name) {
    if (name.length > 5) {
      throw new Error('자동차 이름은 5자 이하로만 부여할 수 있습니다.');
    }
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}
