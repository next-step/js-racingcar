export default class Car {
  #name;
  #position;

  static INITIAL_POSITION = 0;
  static NAME_MAX_LENGTH = 5;
  static MOVE_STEP = 1;

  static ERROR_MESSAGE = Object.freeze({
    EMPTY_NAME: "자동차 이름은 빈 값으로 설정할 수 없습니다.",
    NOT_STRING_NAME: "자동차 이름은 문자열이어야 합니다.",
    LONG_NAME: "자동차 이름은 5글자를 초과하여 설정할 수 없습니다.",
  });

  static of(name, position = Car.INITIAL_POSITION) {
    return new Car(name, position);
  }

  constructor(name, position = Car.INITIAL_POSITION) {
    this.#validateName(name);

    this.#name = name;
    this.#position = position;
  }

  #isLongName(name) {
    return name.length > Car.NAME_MAX_LENGTH;
  }

  #isNotString(name) {
    return typeof name !== "string";
  }

  #validateName(name) {
    if (this.#isNotString(name))
      throw new Error(Car.ERROR_MESSAGE.NOT_STRING_NAME);
    if (!name) throw new Error(Car.ERROR_MESSAGE.EMPTY_NAME);
    if (this.#isLongName(name)) throw new Error(Car.ERROR_MESSAGE.LONG_NAME);
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  getRecord() {
    return {
      name: this.#name,
      position: this.#position,
    };
  }

  #move() {
    this.#position += Car.MOVE_STEP;
  }

  tryMove(moveStrategy) {
    if (moveStrategy.isMovable()) {
      this.#move();
    }
  }
}
