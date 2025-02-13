class Car {
  name;
  position = 0;

  static NAME_MIN_LENGTH = 1;
  static NAME_MAX_LENGTH = 5;

  constructor(name) {
    if (!this.#isValidName(name)) {
      throw new InvalidCarName();
    }

    this.name = name;
  }

  moveForward(canMove = () => true) {
    if (!canMove()) return;
    this.position += 1;
  }

  #isValidName(name) {
    if (typeof name !== "string") return false;
    if (name.length < Car.NAME_MIN_LENGTH) return false;
    if (name.length > Car.NAME_MAX_LENGTH) return false;
    return true;
  }
}

export default Car;

export class InvalidCarName extends Error {
  constructor() {
    super(
      `자동차 이름은 ${Car.NAME_MIN_LENGTH}자 이상, ${Car.NAME_MAX_LENGTH}자 이하여야 합니다.`
    );
  }
}
