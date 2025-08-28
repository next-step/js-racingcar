import Car from '../src/Car.js';

describe('자동차 테스트', () => {
  const CAR_NAME = '싼타페';
  let car;

  beforeEach(() => {
    car = new Car({ name: CAR_NAME });
  });

  test('자동차는 이름을 가진다', () => {
    expect(car.name).toBe(CAR_NAME);
  });

  test('초기 위치는 0이다', () => {
    expect(car.position).toBe(0);
  });

  test('위치는 STEP_SIZE(1) 만큼 전진한다', () => {
    expect(car.position).toBe(Car.INITIAL_POSITION);

    car.moveForward();
    expect(car.position).toBe(Car.INITIAL_POSITION + Car.STEP_SIZE * 1);

    car.moveForward();
    expect(car.position).toBe(Car.STEP_SIZE * 2);
  });
});
