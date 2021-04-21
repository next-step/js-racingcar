export default class Car {
  constructor(name) {
    this.name = name;
    this.moveCount = 0;
  }
  move() {
    this.moveCount++;
  }
}
