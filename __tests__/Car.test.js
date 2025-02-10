import Car from '../src/domain/Car.js';

describe('자동차 테스트', () => {
  const CAR_NAME = '벤틀리';
  const INITIAL_LOCATION = 0;

  it('자동차에 이름을 부여할 수 있다', () => {
    const car = new Car(CAR_NAME);
    expect(car.name).toEqual(CAR_NAME);
  });

  it('자동차 이름은 5자 이하로 설정해야 한다.', () => {
    expect(Car.validateName('벤틀리')).toBe(true);
    expect(Car.validateName('Bentley')).toBe(false);
  });

  it('자동차 이름 앞 뒤에 공백이 포함된 경우 제거된다', () => {
    const car = new Car(' 벤틀리 ');
    expect(car.name).toBe('벤틀리');
  });

  it('자동차 위치의 초기 값은 0이다.', () => {
    const car = new Car(CAR_NAME);
    expect(car.location).toEqual(INITIAL_LOCATION);
  });

  it('자동차가 전진하는 조건은 0에서 9사이 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.', () => {
    const car = new Car(CAR_NAME);
    const randomNumber = Car.getRandomNumber();

    car.forward(() => randomNumber >= 4);

    if (randomNumber >= 4) {
      expect(car.location).toBe(INITIAL_LOCATION + 1);
    }
    if (randomNumber < 4) {
      expect(car.location).toBe(INITIAL_LOCATION);
    }
  });

  it('자동차가 전진할 경우 위치값이 1 증가한다.', () => {
    const car = new Car(CAR_NAME);

    car.forward(() => true);

    expect(car.location).toEqual(INITIAL_LOCATION + 1);
  });
});
