import Car from "./Car";
import { getRandomIntRangeOf } from "../utils";

export const Cars = (function () {
  const CAR_MOVE_CRITERIA = 4;
  const ERROR_MESSAGE = Object.freeze({
    DUPLICATE_CAR_NAME:
      "중복된 자동차 이름으로는 프로그램이 동작할 수 없습니다.",
  });

  function hasDuplicatedCarNames(carNames) {
    return new Set(carNames).size !== carNames.length;
  }

  function validateDuplicateCarNames(carNames) {
    if (hasDuplicatedCarNames(carNames))
      throw new Error(ERROR_MESSAGE.DUPLICATE_CAR_NAME);
  }

  function from(carNames) {
    validateDuplicateCarNames(carNames);

    return carNames.map((carName) => Car.of(carName));
  }

  // TODO 랜덤 숫자 생성 외부로 분리
  function playOneRound(cars) {
    cars.forEach((car) => {
      const randomNumber = getRandomIntRangeOf(0, 9);
      if (randomNumber >= CAR_MOVE_CRITERIA) {
        car.move();
      }
    });
  }

  function getRoundRecord(cars) {
    return cars.map((car) => car.getRecord());
  }

  return {
    ERROR_MESSAGE,
    from,
    playOneRound,
    getRoundRecord,
  };
})();
