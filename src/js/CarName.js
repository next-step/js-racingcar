const MIN_CAR_NAME_LENGTH = 1;
const MAX_CAR_NAME_LENGTH = 5;

class CarName {
  #value;
  constructor(name) {
    CarName.#isEmptyCarName(name);
    CarName.#isInValidCarNameLength(name);
    this.#value = name;
  }

  get value() {
    return this.#value;
  }

  static #isEmptyCarName(name) {
    if (name === undefined || name === null || name.trim() === '')
      throw new Error('이름은 필수 입니다.');
  }

  static #isInValidCarNameLength(name) {
    if (
      !(
        name.length >= MIN_CAR_NAME_LENGTH && name.length <= MAX_CAR_NAME_LENGTH
      )
    )
      throw new Error(
        `이름은 ${MIN_CAR_NAME_LENGTH}~${MAX_CAR_NAME_LENGTH} 까지 가능합니다.`
      );
  }
}
export default CarName;
