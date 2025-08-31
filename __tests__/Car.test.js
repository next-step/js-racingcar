import Car from '../src/Car';
import { ERROR_MESSAGE } from '../src/constants/message';

describe('Cart Raging Game', () => {
  let car;

  beforeEach(() => {
    car = new Car('Max');
  });

  test('자동차는 이름을 상태로 가질 수 있다.', () => {
    expect(car.name).toBe('Max');
  });

  test('자동차 이름은 이름은 5자 이하만 가능하다.', () => {
    expect(() => {
      new Car('inasunnyspot');
    }).toThrow(ERROR_MESSAGE.NAME_LENGTH);
  });

  test('자동차는 위치 값을 가지며, 초기 상태는 0이다.', () => {
    expect(car.position).toBe(0);
  });

  test('자동차에 직접 위치를 할당 할 수 없다.', () => {
    expect(() => {
      car.position = -100;
    }).toThrow(ERROR_MESSAGE.POSITION_INPUT);
  });

  test('자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.', () => {
    car.moveForward();
    expect(car.position).toBe(1);
  });
});
