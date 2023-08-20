import Car from '../src/domain/Car';

describe('Car Class', () => {
  const carName = '자동차';
  let car = null;

  beforeEach(() => {
    car = new Car(carName);
  });

  describe('class 속성 테스트', () => {
    test('Car class는 name이 있다.', () => {
      expect(car.name).toBe(carName);
    });

    test('자동차의 주행거리의 초기값은 0이다.', () => {
      expect(car.distanceDriven).toBe(0);
    });
  });

  describe('자동차 이름 검증 테스트', () => {
    test.each([1, undefined, null, ['123'], {}])(
      `자동차 이름은 문자열이여야 한다.`,
      (name) => {
        expect(() => Car.of(name)).toThrow();
      }
    );

    test.each(['1', '12', '123', '1234', '12345'])(
      `자동차 이름 길이가 1에서 5 사이면 에러가 발생하지 않는다.`,
      (name) => {
        expect(() => Car.of(name)).not.toThrow();
      }
    );

    test(`자동차 이름 길이는 최대 5글자다.`, () => {
      const name = '최대다섯글자';

      expect(() => Car.of(name)).toThrow();
    });

    test(`자동차 이름의 길이는 최소 1글자 이상이다.`, () => {
      const name = '';

      expect(() => Car.of(name)).toThrow();
    });
  });

  describe('자동차 전진 테스트', () => {
    test.each([1, 2, 3])(
      '자동차가 한번 전진시 주행거리의 값이 %i 늘어난다.',
      (moveForwardTimes) => {
        const prevDistanceDriven = car.distanceDriven;

        for (let i = 0; i < moveForwardTimes; i++) {
          car.moveForward();
        }

        expect(car.distanceDriven).toBe(prevDistanceDriven + moveForwardTimes);
      }
    );
  });

  describe('자동차 기록 테스트', () => {
    test('기록 객체는 이름과 주행거리 속성을 포함해야 한다.', () => {
      expect(car.record).toHaveProperty('name');
      expect(car.record).toHaveProperty('distanceDriven');
    });

    const testCases = [
      { name: 'carA', moveForwardTimes: 1 },
      { name: 'carB', moveForwardTimes: 2 },
      { name: 'carC', moveForwardTimes: 3 },
    ];

    test.each(testCases)(
      '기록의 이름과 주행거리는 현재 자동차의 이름, 주행거리와 일치해야 한다.',
      ({ name, moveForwardTimes }) => {
        const car = Car.of(name);

        for (let i = 0; i < moveForwardTimes; i++) {
          car.moveForward();
        }

        expect(car.record.name).toBe(name);
        expect(car.record.distanceDriven).toBe(car.distanceDriven);
      }
    );
  });
});
