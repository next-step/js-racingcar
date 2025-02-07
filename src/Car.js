class Car {
  #name;

  #location;

  getName() {
    return this.#name;
  }

  setName(name) {
    this.#name = name;
  }

  getLocation() {
    return this.#location;
  }

  // TODO: https://github.com/next-step/js-racingcar/pull/270#discussion_r1945834268
  // 배운 점
  // 1. 사용처에서 필요한 만큼의 인터페이스만 열어줍니다
  setLocation(location) {
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

  constructor(name) {
    this.#name = name;
    this.#location = {
      x: 0,
      y: 0,
      z: 0,
    };
  }
}

export default Car;
