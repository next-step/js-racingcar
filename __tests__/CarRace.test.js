import { ERROR_MESSAGE } from '../src/constants/errorMessage';
import Car from '../src/domain/Car';
import CarRace from '../src/domain/CarRace';

describe('CarRace', () => {
  it('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {
    const carRace = new CarRace([
      new Car('광민'),
      new Car('문광민'),
      new Car('Jason'),
    ]);

    expect(carRace.participantNames).toBe('광민, 문광민, Jason');
  });

  it('자동차 경주 횟수를 지정할 수 있다.', () => {
    const carRace = new CarRace([
      new Car('광민'),
      new Car('문광민'),
      new Car('Jason'),
    ]);

    const lapCount = 7;

    carRace.lapCount = lapCount;

    expect(carRace.lapCount).toBe(lapCount);
  });

  describe('자동차 경주 횟수는 1이상의 양수이어야 한다.', () => {
    test.each([[0], [-1], [-1.2]])('.setLapCount(%n)', (lapCount) => {
      const carRace = new CarRace([
        new Car('광민'),
        new Car('문광민'),
        new Car('Jason'),
      ]);
      expect(() => (carRace.lapCount = lapCount)).toThrowError(
        ERROR_MESSAGE.CAR_RACE_LAP_COUNT
      );
    });
  });

  describe('우승자', () => {
    const carNames = ['광민', '민광', 'Jason', 'Ponny'];
    const cars = carNames.map((name) => new Car(name));
    const carRace = new CarRace(cars);

    it('자동차 경주 전에는 우승자를 알 수 없다.', () => {
      const winners = carRace.winners;
      expect(winners).not.toBeDefined();
    });

    it('우승자가 2명 이상일 경우 우승자 이름 조회 시 콤마로 구분한다.', () => {
      const winners = [new Car('Jason'), new Car('Ponny')];
      const winnerName = carRace.getCarNames(winners);

      expect(winnerName).toBe('Jason, Ponny');
    });
  });
});
