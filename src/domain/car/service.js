export default class Car {
  static DEFAULT_CAR_LOCATION = 0;

  #name = '';
  #location = 0;

  constructor({ name, location = Car.DEFAULT_CAR_LOCATION }) {
    this.#name = name;
    this.#location = location;
  }

  /**
   * 자동차 이름을 반환하는 함수
   * @returns 자동차 이름
   */
  getName() {
    return this.#name;
  }

  /**
   * 현재 자동차 위치를 반환하는 함수
   * @returns 현재 자동차 위치
   */
  getLocation() {
    return this.#location;
  }

  /**
   * 자동차를 한 칸 전진하는 함수
   * @returns 한 칸 전진된 자동차 위치
   */
  moveForward() {
    return ++this.#location;
  }
}
