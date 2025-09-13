import { Car } from '../src/domain/models/Car/index.js';
import { Accelerator } from '../src/domain/models/Accelerator/index.js';

const createCar = ({ name = '이름', accelerator = new Accelerator() } = {}) => {
  return new Car({ name, accelerator });
};

describe('자동차는', () => {
  it('1자 이상 5자 이하의 이름을 상태로 가질 수 있다', () => {
    const CAR_NAME = '이름';

    const car = createCar({ name: CAR_NAME });

    expect(car.information.name).toBe(CAR_NAME);
  });

  it('이름이 빈 문자열이거나 공백일 경우 에러가 발생한다.', () => {
    expect(() => createCar({ name: '' })).toThrow(
      Car.ErrorMessages.NAME_REQUIRED,
    );
    expect(() => createCar({ name: '   ' })).toThrow(
      Car.ErrorMessages.NAME_REQUIRED,
    );
  });

  it('이름이 5자를 넘어가면 에러가 발생한다.', () => {
    expect(() => createCar({ name: '이름이6글자' })).toThrow(
      Car.ErrorMessages.NAME_MAX_LENGTH,
    );
  });

  it('위치 값을 가지며, 초기 상태는 0 이다', () => {
    const car = createCar();

    expect(car.information.location).toBe(0);
  });

  it('전진하는 조건을 만족하는 경우 한 번에 1만큼 전진한다.', () => {
    const car = createCar({
      accelerator: new Accelerator({
        lowerBound: 0,
        upperBound: 10,
        threshold: 0,
      }),
    });

    car.move();

    expect(car.information.location).toBe(1);
  });

  it('전진하는 조건을 만족하지 않는 경우 전진하지 않는다.', () => {
    const car = createCar({
      accelerator: new Accelerator({
        lowerBound: 0,
        upperBound: 10,
        threshold: 11,
      }),
    });

    car.move();

    expect(car.information.location).toBe(0);
  });
});
