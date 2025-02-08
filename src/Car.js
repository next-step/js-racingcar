import { carLocationRule, carNameRule } from "./rule.js";

class Car {
  #name;

  #location;

  getName() {
    return this.#name;
  }

  setName(name) {
    if (carNameRule.test(name) === false) {
      throw new Error("생성할 수 없는 이름입니다.");
    }
    this.#name = name;
  }

  getLocation() {
    return this.#location;
  }

  // 비공개
  #setLocation(location) {
    const isProperLocation = [
      carLocationRule.x.test(location.x),
      carLocationRule.y.test(location.y),
      carLocationRule.z.test(location.z),
    ].every((rule) => rule);

    if (isProperLocation === false) {
      throw new Error("설정할 수 없는 위치입니다.");
    }
    this.#location = location;
  }

  goToX() {
    this.#location.x += 1;
  }

  goToY() {
    this.#location.y += 1;
  }

  goToZ() {
    this.#location.z += 1;
  }

  constructor(name, location) {
    this.setName(name);
    this.#setLocation(location);
  }
}

export default Car;
