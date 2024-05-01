import Car from '../src/Domain/Car.js';
import ERROR from '../src/constants/Error.js';
import CONSTANTS from '../src/constants/Constants.js';

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

    test(`자동차는 기존 위치에서 정해진 값(${CONSTANTS.car.move.distance})만큼 전진할 수 있다.`, () => {
      // given
      const { position } = car;

      // when
      car.move();

      // then
      expect(car.position).toBe(position + CONSTANTS.car.move.distance);
    });
  });

  describe('예외 케이스 테스트', () => {
    test(`자동차 이름이 ${CONSTANTS.car.maxNameLength}자를 초과 할 경우 예외 처리한다.`, () => {
      // when + then
      expect(() => new Car('migugin')).toThrow(ERROR.invalidNameLength);
    });
  });
});
