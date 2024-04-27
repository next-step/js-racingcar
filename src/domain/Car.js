export default class Car {
  name;
  position;

  constructor(name) {
    if (name.length > 5) {
      throw new Error("자동차 이름은 5자 이하만 가능합니다.");
    }
    this.name = name;
    this.position = 0;
  }

  moveForward() {
    this.position++;
  }

  move(randomNumber) {
    if (randomNumber >= 4) {
      this.moveForward();
    }
  }
}
