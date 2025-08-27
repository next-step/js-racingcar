class Car {
  static FORWARD_STEP = 1;

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
    this.#name = name;
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
