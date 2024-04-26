export default class Car {
  #name;
  #position = 0;

  constructor(name) {
    if (name.length > 5) {
      throw new Error('자동차 이름은 5자 이하로만 부여할 수 있습니다.');
    }
    this.#name = name;
  }

  // 이름
  get name() {
    return this.#name;
  }

  // 위치
  get position() {
    return this.#position;
  }

  // 전진하기
  move(randomValue) {
    if (randomValue >= 4) {
      this.#position += 1;
    }
  }
}
