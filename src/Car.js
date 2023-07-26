const DEFAULT_POSITION = 0;
const CAR_RUN_UNIT = 1;
const RUN_THRESHOLD = 4;
const CAR_NAME_MIN_LENGTH = 1;
const CAR_NAME_MAX_LENGTH = 5;
const ERROR = Object.freeze({
  CAR_MAX_LENGTH: (MAX_LENGTH) =>
    `자동차 이름은 ${MAX_LENGTH}글자 이하만 가능하다.`,
  CAR_MIN_LENGTH: (MIN_LENGTH) => `
  자동차 이름을 ${MIN_LENGTH}글자 이상만 가능하다.
  `,
  CAR_NAME_ALPHABET: "자동차 이름은 영어 문자열만 가능하다.",
});

const isAlphabet = (str) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
};

export default class Car {
  #name;
  #position = DEFAULT_POSITION;

  constructor(name) {
    this.validateName(name);
    this.#name = name;
  }

  validateName(name) {
    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new Error(ERROR.CAR_MAX_LENGTH(CAR_NAME_MAX_LENGTH));
    }

    if (name.length < CAR_NAME_MIN_LENGTH) {
      throw new Error(ERROR.CAR_MIN_LENGTH(CAR_NAME_MIN_LENGTH));
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
    if (number >= RUN_THRESHOLD) {
      this.#position += CAR_RUN_UNIT;
    }
  }
}

/*
  ?? 4는 무슨 숫자인거지?
  run(number) {
    if (number >= 4) {
      this.#position += 1;
    }
  }

  !! 아하 RUN_THRESHOLD가 넘으면 이동을 하는구나!
  run(number) {
    if (number >= RUN_THRESHOLD) {
      this.#position += CAR_RUN_UNIT;
    }
  }
*/
