import Race from '../src/domain/Race.js';
import Car from '../src/domain/Car.js';

describe('자동차 경주 테스트', () => {
  it('자동차 경주는 5회 진행한다.', () => {
    const race = new Race([new Car('벤틀리'), new Car('캐딜락')]);

    const result = race.start();

    const rounds = result.length;
    expect(rounds).toEqual(5);
  });

  it('경주 1회당 자동차는 1칸 전진한다', () => {
    const race = new Race([new Car('벤틀리'), new Car('캐딜락')]);

    race.proceed();

    const cars = race.cars;
    const locations = cars.map((car) => car.location);
    expect(locations.every((location) => location === 1)).toBe(true);
  });
});
