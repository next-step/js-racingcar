import Game from "../Models/Game";

export default class Car {
  static INITIAL_POSITION = 0;
  static NAME_MAX_LENGTH = 5;
  static ERROR_MESSAGE = {
    LONG_NAME: "자동차 이름은 5글자를 초과하여 설정할 수 없습니다.",
    EMPTY_NAME: "자동차 이름은 빈 값으로 설정할 수 없습니다.",
  };

  #name;
  #position;

  /**
   * @param {string} name - 자동차 이름
   * @param {number} position - 자동차 위치
   */
  constructor(name, position = Car.INITIAL_POSITION) {
    this.validateName(name);

    this.#name = name;
    this.#position = position;
  }

  /**
   * 자동차 이름 유효성 검사 수행 - 빈 값이거나 5자 이하면 오류 발생
   * @param {string} name
   * @returns
   */
  validateName(name) {
    if (!name) throw new Error(Car.ERROR_MESSAGE.EMPTY_NAME);

    if (name.length > Car.NAME_MAX_LENGTH)
      throw new Error(Car.ERROR_MESSAGE.LONG_NAME);

    return;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  /**
   * 자동차 현재 위치를 CAR_MOVE_STEP만큼 전진시킨다.
   */
  #move() {
    this.#position += Game.CAR_MOVE_STEP;
  }

  /**
   * 자동차가 CAN_MOVE 전진 조건을 만족한 경우만 자동차를 전진시킨다.
   * @param {number} randomNumber
   */
  tryMoveWith(randomNumber) {
    if (Game.CAN_MOVE(randomNumber)) {
      this.#move();
    }
  }
}
