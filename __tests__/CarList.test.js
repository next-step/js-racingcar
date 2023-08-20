import Car from '../src/domain/Car';
import CarList from '../src/domain/CarList';

describe('CarList 테스트', () => {
  const carNames = ['자동차1', '자동차2', '자동차3'];
  let carList = null;

  beforeEach(() => {
    carList = new CarList(carNames);
  });

  describe('CarList 세팅 테스트', () => {
    test('CarList의 cars에는 자동차 인스턴스들이 있다.', () => {
      expect(carList.cars.every((car) => car instanceof Car)).toBe(true);
    });
  });

  describe('자동차 기록 테스트', () => {
    test('자동차의 기록을 얻을 수 있다.', () => {
      const records = carList.carsRecord;

      expect(records.length).toBe(carNames.length);
      expect(records[0]).toHaveProperty('name');
      expect(records[0]).toHaveProperty('distanceDriven');
    });
  });

  describe('최대 이동 거리 테스트', () => {
    test('가장 멀리 간 거리를 구할 수 있다.', () => {
      carList.cars.forEach((car, index) => {
        for (let i = 0; i < index; i++) {
          car.moveForward();
        }
      });

      expect(carList.maxDistanceDriven).toBe(2);
    });
  });

  describe('예외 처리 테스트', () => {
    describe('생성자 carNames 테스트', () => {
      test.each([[1, 2, 3], null, undefined])(
        'Car Names가 문자열 배열이 아닐 때',
        (invalidCarNames) => {
          expect(() => new CarList(invalidCarNames)).toThrow();
        }
      );
    });
  });
});
