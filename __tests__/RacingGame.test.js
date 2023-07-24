import Car from '../src/Car';
import RacingGame from '../src/RacingGame';

describe('RacingGame 테스트', () => {
  const carNames = ['자동차1', '자동차2', '자동차3'];
  let cars = null;
  let racingGame = null;

  beforeEach(() => {
    cars = carNames.map((name) => new Car(name));
    racingGame = new RacingGame(cars);
  });

  describe('레이싱 게임 세팅 테스트', () => {
    test('경주에 참여할 자동차들이 있다.', () => {
      expect(racingGame.getCars().every((car) => car instanceof Car)).toBe(
        true
      );
    });
  });

  describe('레이싱 게임 우승 테스트', () => {
    beforeEach(() => {
      cars.forEach((car, index) => {
        for (let i = 0; i < index; i++) {
          car.moveForward();
        }
      });
    });

    test('가장 멀리 간 거리를 구할 수 있다.', () => {
      expect(racingGame.getMaxDistanceDriven()).toBe(2);
    });

    test('우승한 자동차를 구할 수 있다.', () => {
      const [winningCar] = racingGame.getWinningCars();
      const lastCar = cars.at(-1);

      expect(winningCar).toEqual(lastCar);
    });

    test('가장 멀리간 자동차가 여러대이면 모두다 우승자다.', () => {
      expect(
        racingGame
          .getWinningCars()
          .every(
            (winningCar) =>
              winningCar.getDistanceDriven() ===
              racingGame.getMaxDistanceDriven()
          )
      ).toBe(true);
    });
  });

  describe('경주 라운드 테스트', () => {
    test('RacingGame에는 rounds 속성의 초기값은 0이다.', () => {
      expect(racingGame.getRounds()).toBe(0);
    });
  });
});
