import { ERROR_MESSAGE } from '../src/constants/errorMessage';
import Car from '../src/domain/car';

describe('Car', () => {
  describe('자동차에 이름을 부여할 수 있다', () => {
    test.each([
      ['광민', '광민'],
      ['jason', 'jason'],
      ['Moon', 'Moon'],
      ['문 광민', '문 광민'],
    ])('new Car(%s)', (carName, expected) => {
      const name = new Car(carName).name;
      expect(name).toBe(expected);
    });
  });

  describe('자동차 이름은 5자리 이하만 가능하다.', () => {
    test.each([['자바스크립트'], ['json Moon']])('new Car(%s)', (carName) => {
      expect(() => new Car(carName)).toThrowError(ERROR_MESSAGE.CAR_NAME_LIMIT);
    });
  });

  describe('공백 또는 빈문자열만 있는 이름은 부여할 수 없습니다.', () => {
    test.each([[' '], ['   '], ['']])('new Car(%s)', (carName) => {
      expect(() => new Car(carName)).toThrowError(ERROR_MESSAGE.EMPTY_STRING);
    });
  });

  describe('무작위 값이 4이상일 경우 전진한다.', () => {
    test.each([[4], [5], [9]])('.move(%i)', (randomNumber) => {
      const car = new Car('문광민');
      const distanceBeforMove = car.distance;
      car.move(randomNumber);
      const distanceAfterMove = car.distance;

      expect(distanceAfterMove).toBeGreaterThan(distanceBeforMove);
    });

    test.each([[0], [1], [2], [3]])('.move(%i)', (randomNumber) => {
      const car = new Car('문광민');
      const distanceBeforMove = car.distance;
      car.move(randomNumber);
      const distanceAfterMove = car.distance;

      expect(distanceAfterMove).toBe(distanceBeforMove);
    });
  });
});
