class Car {
  static NAME_LENGTH = 5;

  name;
  position = 0;

  move(randomValue) {
    if (randomValue >= 4) {
      this.position += 1;
    }
  }

  constructor(name) {
    if (name.length > Car.NAME_LENGTH) {
      throw new Error("자동차의 이름은 5 이하만 가능합니다.");
    }
    this.name = name;
  }
}

export default Car;
