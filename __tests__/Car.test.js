import { Car, getRandomInt } from '../src/models/Car/index.js';
import {
  CAR_NAME_REQUIRED_ERROR_MESSAGE,
  CAR_NAME_MAX_LENGTH_ERROR_MESSAGE,
  CAR_MOVE_THRESHOLD,
} from '../src/models/Car/constant.js';

jest.mock('../src/models/Car/index.js', () => {
  const actual = jest.requireActual('../src/models/Car/index.js');
  return {
    ...actual,
    getRandomInt: jest.fn(),
  };
});

const createCar = (name = '이름') => {
  return new Car(name);
};

describe('자동차는', () => {
  it('1자 이상 5자 이하의 이름을 상태로 가질 수 있다', () => {
    const CAR_NAME = '이름';

    const car = createCar(CAR_NAME);

    expect(car.information.name).toBe(CAR_NAME);
  });

  it('이름이 빈 문자열이거나 공백일 경우 에러가 발생한다.', () => {
    expect(() => createCar('')).toThrow(CAR_NAME_REQUIRED_ERROR_MESSAGE);
    expect(() => createCar('   ')).toThrow(CAR_NAME_REQUIRED_ERROR_MESSAGE);
  });

  it('이름이 5자를 넘어가면 에러가 발생한다.', () => {
    expect(() => createCar('이름이6글자')).toThrow(
      CAR_NAME_MAX_LENGTH_ERROR_MESSAGE,
    );
  });

  it('위치 값을 가지며, 초기 상태는 0 이다', () => {
    const car = createCar();

    expect(car.information.location).toBe(0);
  });

  it('전진하는 조건을 만족하는 경우 한 번에 1만큼 전진한다.', () => {
    jest.mocked(getRandomInt).mockReturnValue(CAR_MOVE_THRESHOLD);
    const car = createCar();

    car.move();

    expect(car.information.location).toBe(1);
  });

  it('전진하는 조건을 만족하지 않는 경우 전진하지 않는다.', () => {
    jest.mocked(getRandomInt).mockReturnValue(CAR_MOVE_THRESHOLD - 1);
    const car = createCar();

    car.move();

    expect(car.information.location).toBe(0);
  });
});
