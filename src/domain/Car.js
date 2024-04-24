class Car {
  name;
  position = 0;

  constructor(name) {
    if (name.length > 5) {
      throw new Error("이름은 5자 이하여야 합니다.");
    }
    this.name = name;
  }

  get name() {
    return this.name;
  }

  get position() {
    return this.position;
  }

  static shouldCarMove(randomValue) {
    if (randomValue >= 4) {
      return true;
    }

    return false;
  }

  move() {
    this.position++;
  }
}

export default Car;
