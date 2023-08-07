import Car from '../src/Car';
import RacingGame from '../src/RacingGame';
import * as getRandomInRangeModule from '../src/utils/getRandomInRange';

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

  describe('자동차 전진 조건 테스트', () => {
    test.each([4, 5, 6, 7, 8, 9])(
      '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 있는 상태이다',
      (randomNumber) => {
        const getRandomInRangeSpy = jest
          .spyOn(getRandomInRangeModule, 'getRandomInRange')
          .mockReturnValue(randomNumber);

        expect(racingGame.canMoveForward()).toBe(true);

        getRandomInRangeSpy.mockRestore();
      }
    );

    test.each([1, 2, 3])(
      '랜덤으로 생성한 숫자가 %i이면 자동차가 전진할 수 없는 상태이다',
      (randomNumber) => {
        const getRandomInRangeSpy = jest
          .spyOn(getRandomInRangeModule, 'getRandomInRange')
          .mockReturnValue(randomNumber);

        expect(racingGame.canMoveForward()).toBe(false);

        getRandomInRangeSpy.mockRestore();
      }
    );
  });

  describe('레이싱 게임 우승 테스트', () => {
    describe('단독 우승 테스트', () => {
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
    });

    describe('우승자가 여러명 일 때', () => {
      test('모든 자동차가 이동 거리가 똑같다면 모든 자동차가 우승자다.', () => {
        cars.forEach((car) => {
          car.moveForward();
        });

        expect(racingGame.getWinningCars()).toEqual(cars);
      });
    });
  });

  describe('경주 라운드 테스트', () => {
    test('RacingGame에는 rounds 속성의 초기값은 0이다.', () => {
      expect(racingGame.getRounds()).toBe(0);
    });

    describe('round 진행시 rounds 값이 하나 증가한다.', () => {
      test.each([1, 2, 3])(
        'round %i번 진행시 rounds 값은 %i이다.',
        (runRoundTimes) => {
          for (let i = 0; i < runRoundTimes; i++) {
            racingGame.runRound();
          }

          expect(racingGame.getRounds()).toBe(runRoundTimes);
        }
      );
    });

    test('round 진행시 각 자동차들은 전진 함수가 실행 된다.', () => {
      const spyList = cars.map((car) => jest.spyOn(car, 'moveForward'));

      racingGame.runRound();

      spyList.forEach((spy) => {
        expect(spy).toBeCalled();
        spy.mockRestore();
      });
    });
  });
});
