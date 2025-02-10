import Race from '../src/race.js';
import Car from '../src/car.js';

describe('자동차 경주', () => {
  it('Car List 인스턴스를 받아 자동차 경주를 준비 할 수 있다.', () => {
    const name = ['to', 'kia', 'jest'];
    const cars = name.map((car) => new Car(car));
    const race = new Race(cars);
    expect(race.cars).toEqual(cars);
  });

  it('라운드의 궤적 데이터를 저장 하여야 한다.', () => {
    const name = ['to', 'kia', 'jest'];
    const cars = name.map((car) => new Car(car));
    const race = new Race(cars);
    race.startRace();
    expect(race.getTrajectory()).toHaveLength(Race.RaceMaxCount);
  });
});
