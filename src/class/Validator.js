const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
  INVALID_NAME_TYPE: "자동차 이름은 문자열이여야 합니다.",
  DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
  INVALID_RACING_ROUND_FORMAT: "양의 정수 형식의 값을 입력해 주세요.",
  INVALID_RACING_ROUND_VALUE: "1이상 값을 입력해주세요.",
};

const RACING_CAR_ERROR_NAME = "RACING_CAR_ERROR";

const CAR_NAME_MAX_LENGTH = 5;
const CAR_NAME_MIN_LENGTH = 1;
const RACING_ROUND_MIN_VALUE = 1;

const rRacingRound = /^[0-9]+$/;

export class RacingCarGameError extends Error {
  constructor(message) {
    super(message);
    this.name = RACING_CAR_ERROR_NAME;
  }
}

export default class Validator {
  static validateCarNames(newCarNames, carNames) {
    const carNamesSet = new Set(carNames);

    newCarNames.forEach((newCar) => {
      if (carNamesSet.has(newCar)) {
        throw new RacingCarGameError(ERROR_MESSAGES.DUPLICATE_CAR_NAME);
      }
    });
  }

  static validateCarName(name) {
    if (typeof name !== "string") {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_TYPE);
    }

    if (name.trim().length < CAR_NAME_MIN_LENGTH) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_EMPTY_NAME);
    }

    if (name.length > CAR_NAME_MAX_LENGTH) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_LENGTH);
    }
  }

  static validateRoundNumber(roundNumber) {
    if (!rRacingRound.test(roundNumber)) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_RACING_ROUND_FORMAT);
    }

    const enteredRacingRoundNumber = Number(roundNumber);

    if (enteredRacingRoundNumber < RACING_ROUND_MIN_VALUE) {
      throw new RacingCarGameError(ERROR_MESSAGES.INVALID_RACING_ROUND_VALUE);
    }
  }
}
