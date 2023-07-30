import {Car} from '../Car';

describe('Car class test', () => {
  test('자동차 객체를 생성시에 이름을 부여할 수 있다.', () => {
    const car = new Car('pobi');
    expect(car.carName).toBe('pobi');
  });

  test('자동차는 0부터 시작해서 1씩 전진할 수 있다.', () => {
    const car = new Car('pobi');
    expect(car.distance).toBe(0);
    car.move();
    expect(car.distance).toBe(1);
    car.move();
    expect(car.distance).toBe(2);
  });
});
