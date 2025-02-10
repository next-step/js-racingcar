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

  it('랜덤값이 3보다 클 때 자동차가 전진해야 한다.', () => {
    Race.randomNumber = jest.fn(() => 5);
    const trajectory = race.startRace();

    expect(trajectory).toHaveLength(5);

    trajectory.forEach((roundData, index) => {
      const expectedLocation = index + 1;
      roundData.trajectory.forEach((carData) => {
        expect(carData.location).toBe(expectedLocation);
      });
    });
  });
  it('랜덤값이 3보다 작을 때 자동차는 전진 하지 못한다.', () => {
    Race.randomNumber = jest.fn(() => 3);
    const trajectory = race.startRace();

    expect(trajectory).toHaveLength(5);

    trajectory.forEach((roundData) => {
      roundData.trajectory.forEach((carData) => {
        expect(carData.location).toBe(0);
      });
    });
  });
});
