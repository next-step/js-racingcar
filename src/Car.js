class Car {
  // 자동차는 이름을 상태로 가질 수 있다.
  // 자동차는 위치 값을 가지며, 초기 상태는 0이다.
  // 자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.

  #name;
  #position;

  constructor() {
    this.#name = "";
    this.#position = 0;
  }

  changeName(name) {
    this.#name = name;
  }

  move() {
    this.#position++;
  }
}
