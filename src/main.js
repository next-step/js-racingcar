export default class Car {
  #name = '';
  #location = 0;

  constructor({ name }) {
    this.#name = name;
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
