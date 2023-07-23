import { RACE_LAP_LIMIT } from '../src/constants';
import Car from '../src/domain/car';
import CarRace from '../src/domain/carRace';

describe('CarRace', () => {
  it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {
    const carRace = new CarRace([
      new Car('광민'),
      new Car('문광민'),
      new Car('Jason'),
    ]);

    expect(carRace.participantNames).toBe('광민, 문광민, Jason');
  });

  it('자동차 경주는 5회로 고정한다.', () => {
    const car = new Car('광민');
    const carRace = new CarRace([car]);
    const runOneLap = jest.spyOn(car, 'runOneLap');

    carRace.start();

    expect(runOneLap).toBeCalledTimes(RACE_LAP_LIMIT);
  });
});
