import Car from '../src/Domain/Car';
import ERROR from '../src/constants/Error';
import CONSTANTS from '../src/constants/Constants';

/* 
- 자동차에 5자 이하의 이름을 부여할 수 있다.
- 자동차는 전진하거나 멈출 수 있다.
- 전진하는 경우는 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.
*/

describe('자동차 테스트', () => {
  let car;

  describe('정상 케이스 테스트', () => {
    beforeEach(() => {
      car = new Car('pobi');
    });

    test('자동차 이름은 5자 이하여야 한다.', () => {
      // when
      const { name } = car;

      // then
      expect(name.length <= CONSTANTS.car.maxNameLength).toBeTruthy();
    });

    test.each([
      [0, CONSTANTS.car.initialPosition],
      [1, CONSTANTS.car.initialPosition],
      [2, CONSTANTS.car.initialPosition],
      [3, CONSTANTS.car.initialPosition],
      [4, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
      [5, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
      [6, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
      [7, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
      [8, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
      [9, CONSTANTS.car.initialPosition + CONSTANTS.car.move.distance],
    ])(
      `자동차가 전진하는 조건은 0에서 9 사이에서 무작위로 얻은 값이 4 이상일 때이다.`,
      (input, result) => {
        // given
        Car.getRandomNumber = jest.fn().mockReturnValue(input);

        // when
        car.move();

        // then
        expect(car.position).toBe(result);
      },
    );
  });

  describe('예외 케이스 테스트', () => {
    test('자동차 이름이 5자 이상일 경우 예외 처리한다.', () => {
      // when + then
      expect(() => new Car('migugin')).toThrow(ERROR.invalidNameLength);
    });
  });
});
