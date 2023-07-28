export default class Car {
  name;
  position;

  constructor(name, position = 0) {
    this.name = name;
    this.position = position;
  }

  tryMoveWith(randomNumber) {
    if (randomNumber >= 4) {
      this.position += 1;
    }
  }
}
