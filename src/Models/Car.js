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

  constructor(name, position = Car.INITIAL_POSITION) {
    this.validateName(name);

    this.#name = name;
    this.#position = position;
  }

  #isEmptyName(name) {
    return !name;
  }

  #isLongName(name) {
    return name.length > Car.NAME_MAX_LENGTH;
  }

  validateName(name) {
    if (this.#isEmptyName(name)) throw new Error(Car.ERROR_MESSAGE.EMPTY_NAME);

    if (this.#isLongName(name)) throw new Error(Car.ERROR_MESSAGE.LONG_NAME);
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  #move(step) {
    this.#position += step;
  }

  tryMoveWith(randomNumber, step = Game.CAR_MOVE_STEP) {
    if (!Game.isMovable(randomNumber)) return;

    this.#move(step);
  }
}
