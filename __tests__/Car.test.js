import Car from '../src/Car';

describe('자동차 class 속성 테스트', () => {
  test('Car class는 name이 있다.', () => {
    const carName = '자동차';
    const car = new Car(carName);

    expect(car.getName()).toBe(carName);
  });

  test('자동차의 주행거리의 초기값은 0이다.', () => {
    const carName = '자동차';
    const car = new Car(carName);

    expect(car.getDistanceDriven()).toBe(0);
  });
});
