import Race from '../src/race.js';
import Car from '../src/car.js';

describe('자동차 경주', () => {
  let name = null;
  let cars = null;
  let race = null;

  beforeEach(() => {
    name = ['to', 'kia', 'jest'];
    cars = name.map((car) => new Car(car));
    race = new Race(cars);
  });

  it('Car List 인스턴스를 받아 자동차 경주를 준비 할 수 있다.', () => {
    expect(race.cars).toEqual(cars);
  });

  it('라운드의 궤적 데이터를 저장 하여야 한다.', () => {
    race.startRace();
    expect(race.getTrajectory()).toHaveLength(Race.RaceMaxCount);
  });
});
