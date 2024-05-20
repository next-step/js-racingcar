class Car {
  static CAR_MAX_NAME_LENGTH = 5;
  static CAR_MIN_NAME_LENGTH = 1;

  #name;
  #position = 0;

  constructor(name) {
    if (!this.isValidNameLength(name)) {
      throw new Error("자동차 이름은 1자 이상 5자 이하로 입력해주세요.");
    }
    this.#name = name;
  }

  isValidNameLength(name) {
    return (
      name.length <= Car.CAR_MAX_NAME_LENGTH &&
      name.length >= Car.CAR_MIN_NAME_LENGTH
    );
  }

  move(movable = true) {
    if (movable) {
      this.#position += 1;
    }
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }
}

export default Car;
