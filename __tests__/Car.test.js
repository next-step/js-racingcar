import Car from '../src/car';

describe('자동차 경주 테스트', () => {
  const CAR_NAME = 'Bentley';
  const INITIAL_LOCATION = 0;

  it('자동차에 이름을 부여할 수 있다', () => {
    const car = new Car(CAR_NAME);
    expect(car.name).toEqual(CAR_NAME);
  });

  it('자동차 위치의 초기 값은 0이다.', () => {
    const car = new Car(CAR_NAME);
    expect(car.location).toEqual(INITIAL_LOCATION);
  });

  it('자동차는 전진할 수 있으며, 전진할 경우 위치값이 1 증가한다.', () => {
    const car = new Car(CAR_NAME);

    car.forward();

    expect(car.location).toEqual(INITIAL_LOCATION + 1);
  });
});
