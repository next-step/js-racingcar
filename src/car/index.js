export default class Car {
  constructor(name) {
    this.name = name;
  }

  position = 0;

  move() {
    this.position++;
  }

  getStatus() {
    return `${this.name} : ${"-".repeat(this.position)}`;
  }
}
