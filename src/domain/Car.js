export class Car {
  name;
  position;

  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  isValidateName() {
    if (this.name.length > 5) return false;
    return true;
  }

  getName() {
    return this.name;
  }

  getRandomValue() {
    return Math.floor(Math.random() * 10);
  }

  getPosition() {
    return this.position;
  }

  move() {
    const randomValue = this.getRandomValue();
    if (randomValue >= 4) {
      this.position += 1;
    }
  }
}
