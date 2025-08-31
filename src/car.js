export class Car {
  static FORWARD_STEP = 1;
  static MAX_LENGTH_NAME = 5;
  static MIN_LENGTH_NAME = 1;

  #name;
  get name() {
    return this.#name;
  }

  #position = 0;
  get position() {
    return this.#position;
  }

  constructor(name, position = 0) {
    if (typeof name !== "string" || name.length === 0) {
      throw new Error("자동차 이름은 빈 문자열일 수 없습니다.");
    }
    if (typeof name !== "string" || Car.MAX_LENGTH_NAME < name.length) {
      throw new Error("자동차 이름은 5자 이하만 가능합니다.");
    }
    this.#name = name;
    if (typeof position !== "number" || position < 0) {
      throw new Error("자동차의 위치는 음수 값일 수 없습니다.");
    }
    this.#position = position;
  }

  forward(position = Car.FORWARD_STEP) {
    if (position < 0) {
      throw new Error("자동차는 음수 값으로 전진할 수 없습니다.");
    }
    this.#position += position;
  }
}

export default Car;
