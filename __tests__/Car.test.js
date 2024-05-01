import Car from '../src/Domain/Car.js';
import ERROR from '../src/constants/Error.js';
import CONSTANTS from '../src/constants/Constants.js';
import Random from '../src/utils/Random.js';

describe('자동차 테스트', () => {
  let car;

  describe('정상 케이스 테스트', () => {
    beforeEach(() => {
      car = new Car('pobi');
    });

    test(`자동차 이름은 ${CONSTANTS.car.maxNameLength}자 이하여야 한다.`, () => {
      // when
      const { name } = car;

      // then
      expect(name.length <= CONSTANTS.car.maxNameLength).toBeTruthy();
    });

    test(`자동차는 ${CONSTANTS.car.move.minNumber}~${CONSTANTS.car.move.maxNumber} 사이에서 무작위로 얻은 값이 ${CONSTANTS.car.move.threshold} 이상일 때 전진할 수 있다.`, () => {
      // given
      Random.getRandomNumber = jest
        .fn()
        .mockReturnValue(CONSTANTS.car.move.threshold);

      // when
      car.move();

      // then
      expect(car.position).toBe(
        CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance,
      );
    });

    test(`자동차는 ${CONSTANTS.car.move.minNumber}~${CONSTANTS.car.move.maxNumber} 사이에서 무작위로 얻은 값이 ${CONSTANTS.car.move.threshold} 미만일 때 전진할 수 없다.`, () => {
      // given
      Random.getRandomNumber = jest
        .fn()
        .mockReturnValue(CONSTANTS.car.move.threshold - 1);

      // when
      car.move();

      // then
      expect(car.position).toBe(CONSTANTS.car.initialPosition);
    });
  });

  describe('예외 케이스 테스트', () => {
    test(`자동차 이름이 ${CONSTANTS.car.maxNameLength}자를 초과 할 경우 예외 처리한다.`, () => {
      // when + then
      expect(() => new Car('migugin')).toThrow(ERROR.invalidNameLength);
    });
  });
});
