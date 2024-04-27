export class Car {
  name;
  position;
  randomValue;

  constructor() {
    this.name = '';
    this.position = 0;
    this.randomValue = 0;
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
    this.randomValue = Math.floor(Math.random(0, 9) * 10);
  }

  getPosition() {
    return this.position;
  }

  move() {
    if (this.randomValue >= 4) {
      this.position += 1;
    }
  }
}
