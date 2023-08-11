export const DEFAULT_POSITION = 0;
export const CAR_RUN_UNIT = 1;
export const FORWARD_CONDITION = 4;
export const CAR_NAME_MAX_LENGTH = 5;
export const CAR_NAME_MIN_LENGTH = 1;

export const ERROR = Object.freeze({
  CAR_NAME_MAX_LENGTH: (MAX_LENGTH) => `자동차는 이름은 ${MAX_LENGTH}자 이하만 가능하다.`,
  CAR_NAME_MIN_LENGTH: (MIN_LENGTH) => `자동차는 이름은 ${MIN_LENGTH}자 이상만 가능하다.`,
  CAR_NAME_ALPHABET: "자동차 이름은 영어 문자열만 가능하다."
});

function isAlphabet(str) {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
}

export default class Car {
  #name;
  #position = DEFAULT_POSITION;

  constructor(name) {
    this.validateName(name);

    this.#name = name;
  }

  validateName(name) {
    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new Error(ERROR.CAR_NAME_MAX_LENGTH(CAR_NAME_MAX_LENGTH));
    }

    if (name.length < CAR_NAME_MIN_LENGTH) {
      throw new Error(ERROR.CAR_NAME_MIN_LENGTH(CAR_NAME_MIN_LENGTH));
    }

    if (!isAlphabet(name)) {
      throw new Error(ERROR.CAR_NAME_ALPHABET);
    }
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  run(number) {
    if (number >= FORWARD_CONDITION) {
      this.#position += CAR_RUN_UNIT;
    }
  }
}
