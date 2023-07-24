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

  describe('우승자', () => {
    const carNames = ['광민', '민광', 'Jason', 'Ponny'];
    const cars = carNames.map((name) => new Car(name));
    const carRace = new CarRace(cars);

    it('자동차 경주 전에는 우승자를 알 수 없다.', () => {
      const winners = carRace.winners;
      expect(winners).not.toBeDefined();
    });

    it('자동차 경주 완료 후 우승자를 알 수 있다.', () => {
      carRace.start();

      const winners = carRace.winners;
      const winnerNames = winners.map((car) => car.name);
      const isWinnerInCarNames = winnerNames.some((winnerName) => {
        return carNames.includes(winnerName);
      });

      expect(winners).toBeDefined();
      expect(isWinnerInCarNames).toBeTruthy();
    });
  });
});
