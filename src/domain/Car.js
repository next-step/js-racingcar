import GeneratorNumber from "../utils/generatorNumber.js";

class Car {
  name;
  position = 0;

  move() {
    const randomValue = GeneratorNumber.generateRandomNumber();
    if (randomValue >= 4) {
      this.position += 1;
    }
  }

  constructor(name) {
    if (name.length > 5) {
      throw new Error("자동차의 이름은 5 이하만 가능합니다.");
    }
    this.name = name;
  }

  get name() {
    return this.name;
  }

  get position() {
    return this.position;
  }
}

export default Car;
