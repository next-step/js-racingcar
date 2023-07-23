import Car from '../src/Car';

describe('자동차 class 속성 테스트', () => {
  const carName = '자동차';
  let car = null;

  beforeEach(() => {
    car = new Car(carName);
  });

  test('Car class는 name이 있다.', () => {
    expect(car.getName()).toBe(carName);
  });

  test('자동차의 주행거리의 초기값은 0이다.', () => {
    expect(car.getDistanceDriven()).toBe(0);
  });
});
