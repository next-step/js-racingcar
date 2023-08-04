import Car from '../src/Car';
import * as getRandomInRangeModule from '../src/utils/getRandomInRange';

describe('Car Class', () => {
  const carName = '자동차';
  let car = null;

  beforeEach(() => {
    car = new Car(carName);
  });

  describe('class 속성 테스트', () => {
    test('Car class는 name이 있다.', () => {
      expect(car.getName()).toBe(carName);
    });

    test('자동차의 주행거리의 초기값은 0이다.', () => {
      expect(car.getDistanceDriven()).toBe(0);
    });
  });

  describe('자동차 전진 조건 테스트', () => {
    test.each([4, 5, 6, 7, 8, 9])(
      '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 있는 상태이다',
      (randomNumber) => {
        const getRandomInRangeSpy = jest
          .spyOn(getRandomInRangeModule, 'getRandomInRange')
          .mockReturnValue(randomNumber);

        expect(car.canMoveForward()).toBe(true);

        getRandomInRangeSpy.mockRestore();
      }
    );

    test.each([1, 2, 3])(
      '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 없는 상태이다',
      (randomNumber) => {
        const getRandomInRangeSpy = jest
          .spyOn(getRandomInRangeModule, 'getRandomInRange')
          .mockReturnValue(randomNumber);

        expect(car.canMoveForward()).toBe(false);

        getRandomInRangeSpy.mockRestore();
      }
    );
  });

  describe('자동차 전진 테스트', () => {
    let canMoveForwardSpy;

    beforeEach(() => {
      canMoveForwardSpy = jest.spyOn(car, 'canMoveForward');
    });

    afterEach(() => {
      canMoveForwardSpy.mockRestore();
    });

    test('조건을 만작하고 자동차가 전진시 주행거리의 값이 1 늘어난다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();

      canMoveForwardSpy.mockReturnValue(true);
      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven + 1);
    });

    test('조건을 만족하고 자동차가 두번 전진시 주행거리의 값이 2 늘어난다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();

      canMoveForwardSpy.mockReturnValue(true);
      car.moveForward();
      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven + 2);
    });

    test('조건을 만족하지 않으면 자동차는 전진하지 않는다.', () => {
      const prevDistanceDriven = car.getDistanceDriven();

      canMoveForwardSpy.mockReturnValue(false);
      car.moveForward();

      expect(car.getDistanceDriven()).toBe(prevDistanceDriven);
    });
  });
});
