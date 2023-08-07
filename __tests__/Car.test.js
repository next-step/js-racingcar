import Car from '../src/Car';

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

  describe('자동차 이름 검증 테스트', () => {
    test.each(['1', '12', '123', '1234', '12345'])(
      `자동차 이름 길이가 ${Car.NAME_LENGTH.MIN}에서 ${Car.NAME_LENGTH.MAX} 사이면 에러가 발생하지 않는다.`,
      (name) => {
        expect(() => Car.of(name)).not.toThrow();
      }
    );

    test(`자동차 이름 길이는 최대 ${Car.NAME_LENGTH.MAX}글자다.`, () => {
      const name = '최대다섯글자';

      expect(() => Car.of(name)).toThrow(
        new Error(Car.NAME_ERROR_MESSAGE.OVER_THAN_MAX)
      );
    });

    test(`자동차 이름의 길이는 최소 ${Car.NAME_LENGTH.MIN}글자 이상이다.`, () => {
      const name = '';

      expect(() => Car.of(name)).toThrow(
        new Error(Car.NAME_ERROR_MESSAGE.LESS_THAN_MIN)
      );
    });
  });

  describe('자동차 전진 테스트', () => {
    test.each([1, 2, 3])(
      '자동차가 한번 전진시 주행거리의 값이 %i 늘어난다.',
      (moveForwardTimes) => {
        const prevDistanceDriven = car.getDistanceDriven();

        for (let i = 0; i < moveForwardTimes; i++) {
          car.moveForward();
        }

        expect(car.getDistanceDriven()).toBe(
          prevDistanceDriven + moveForwardTimes
        );
      }
    );
  });
});
