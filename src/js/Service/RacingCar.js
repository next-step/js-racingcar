export default class RacingCar {
  #position;
  #name;
  constructor(name) {
    this.#validateCarName(name);
    this.#name = name;
    this.#position = 0;
  }

  /**
   * 자동차를 이동시킵니다.
   * @returns {number} 자동차의 현재 위치
   */
  move() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.#isMove()) {
          this.#position++;
        }
        resolve(this.#position);
      }, 1000);
    });
  }

  /* 자동차의 현재 위치를 반환합니다.
   *  * @returns {number} 자동차의 현재 위치
   */
  getPosition() {
    return this.#position;
  }

  /* 자동차의 이름을 반환합니다.
   *  * @returns {string} 자동차의 이름
   */
  getName() {
    return this.#name;
  }

  /*  0~limit 사이의 random number 를 얻습니다.
   *  * @returns {number} 0~limit 사이의 random number
   */
  #getRandomNumber(limit = 10) {
    return Math.floor(Math.random() * limit);
  }

  /*  자동차 이름을 validate 합니다.
   * @param {string} carName 자동차 이름
   */

  #validateCarName(carName) {
    if (carName.length < 1 || carName.length > 5) {
      throw new Error(
        '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.'
      );
    }
  }

  /*  자동차가 움직일지 아닐지를 결정합니다.
   * @returns {boolean}
   */
  #isMove() {
    const MOVE_LIMIT = 4;
    return this.#getRandomNumber() >= MOVE_LIMIT;
  }
}
