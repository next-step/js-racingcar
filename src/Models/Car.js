import { CAR_MOVE_STEP, CAN_MOVE } from "../constants/game";
import {
  CAR_INIT_POSITION,
  CAR_ERROR_MESSAGE,
  CAR_NAME_MAX_LENGTH,
} from "../constants/car.js";
export default class Car {
  #name;
  #position;

  /**
   * @param {string} name - 자동차 이름
   * @param {number} position - 자동차 위치
   */
  constructor(name, position = CAR_INIT_POSITION) {
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
    if (!name) throw new Error(CAR_ERROR_MESSAGE.EMPTY_NAME);

    if (name.length > CAR_NAME_MAX_LENGTH)
      throw new Error(CAR_ERROR_MESSAGE.LONG_NAME);

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
    this.#position += CAR_MOVE_STEP;
  }

  /**
   * 자동차가 CAN_MOVE 전진 조건을 만족한 경우만 자동차를 전진시킨다.
   * @param {number} randomNumber
   */
  tryMoveWith(randomNumber) {
    if (CAN_MOVE(randomNumber)) {
      this.#move();
    }
  }
}
