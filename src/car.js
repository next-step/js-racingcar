class Car {
  static FORWARD_STEP = 1;

  constructor(name, position = 0) {
    if (typeof name !== "string" || name.length === 0) {
      throw new Error("자동차 이름은 빈 문자열일 수 없습니다.");
    }
    this.name = name;
    this.position = position;
  }

  forward(position = Car.FORWARD_STEP) {
    this.position += position;
  }
}

export default Car;
