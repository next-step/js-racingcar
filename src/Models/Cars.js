import Car from "./Car";
import { RandomStrategy } from "./MoveStrategy";

export const Cars = (function () {
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

  function playOneRound(cars) {
    cars.forEach((car) => {
      car.tryMove(new RandomStrategy());
    });
  }

  function getRoundRecord(cars) {
    return cars.map((car) => car.getRecord());
  }

  return {
    // CHECK 테스트 코드를 위해 public으로 빼는게 맞는지?
    ERROR_MESSAGE,
    from,
    playOneRound,
    getRoundRecord,
  };
})();
