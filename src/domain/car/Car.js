export class Car {
  #name;
  #position;

  static DEFAULT_POSITION = 0;
  static MAX_NAME_LENGTH = 5;


  constructor(name) {
    this.#isValidNameLength(name);
    this.#name = name;
    this.#position = Car.DEFAULT_POSITION;
  }

  #isValidNameLength(name) {
    if (!name || /^\s*$/.test(name)) {
      throw new Error("차 이름이 null값 이거나 빈 값일 수는 없습니다.");
    }

    if (name.length > Car.MAX_NAME_LENGTH) {
      throw new Error("차량 이름은 5글자를 초과 할 수 없습니다.");
    }
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }
}
