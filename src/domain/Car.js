export class Car {
  name;
  position;

  constructor() {
    this.name = '';
    this.position = 0;
  }

  setName(name) {
    if (name.length > 5) {
      this.name = '';
    } else {
      this.name = name;
    }
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
