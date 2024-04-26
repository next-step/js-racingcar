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

  static isValidName(name) {
    return name.length <= 5;
  }

  moveRandom() {
    const randomValue = Math.floor(Math.random() * 10);

    if (Car.shouldCarMove(randomValue)) {
      this.move();
    }
  }

  move() {
    this.position++;
  }

  positionToString() {
    return "-".repeat(this.position);
  }

  statusToString() {
    return `${this.name} : ${this.positionToString()}`;
  }
}

export default Car;
