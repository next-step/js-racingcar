import { Car } from '../../src/domain/car.js';

describe('객체 생성', () => {
  it('생성', () => {
    const car = new Car('name');

    expect(car.name).toEqual('name');
    expect(car.position).toEqual(0);
  });
});

describe('이동', () => {
  let car;

  beforeEach(() => {
    car = new Car('name', 0);
  });

  it('이동', () => {
    car.move(() => true);

    expect(car.position).toEqual(1);
  });

  it('정지', () => {
    car.move(() => false);

    expect(car.position).toEqual(0);
  });
});
