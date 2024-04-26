import { Car } from '../../src/domain/car.js';
import { getMaxPosition, getWinners } from '../../src/domain/winners.js';

describe('최대 위치 구하기', () => {
  const k3 = new Car('k3', 7);
  const k5 = new Car('k5', 5);
  const k7 = new Car('k7', 3);
  const cars = [k3, k5, k7];

  const actual = getMaxPosition(cars);

  expect(actual).toEqual(7);
});

describe('우승자 구하기', () => {
  it('한 대의 자동차가 우승', () => {
    const k3 = new Car('k3', 7);
    const k5 = new Car('k5', 5);
    const k7 = new Car('k7', 3);
    const cars = [k3, k5, k7];

    const actual = getWinners(cars);

    expect(actual).toEqual(['k3']);
  });

  it('세 대의 자동차가 우승', () => {
    const k3 = new Car('k3', 8);
    const k5 = new Car('k5', 7);
    const k7 = new Car('k7', 6);
    const k8 = new Car('k8', 8);
    const k9 = new Car('k9', 3);
    const cars = [k3, k5, k7, k8, k9];

    const actual = getWinners(cars);

    expect(actual).toEqual(['k3', 'k8']);
  });
});
