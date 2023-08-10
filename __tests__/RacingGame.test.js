import Car from '../src/Car';
import RacingGame from '../src/RacingGame';

describe('RacingGame 테스트', () => {
  const carNames = ['자동차1', '자동차2', '자동차3'];
  const checkCanMoveForward = () => true;
  let cars = null;
  let racingGame = null;

  beforeEach(() => {
    cars = carNames.map((name) => new Car(name));
    racingGame = new RacingGame(cars);
  });

  describe('레이싱 게임 세팅 테스트', () => {
    test('경주에 참여할 자동차들이 있다.', () => {
      expect(racingGame.cars.every((car) => car instanceof Car)).toBe(true);
    });
  });

  describe('자동차 게임 전진 테스트', () => {
    test('자동차 전진 조건을 만족하면 자동차는 전진한다.', () => {
      racingGame.startRace(checkCanMoveForward);

      expect(racingGame.cars.every((car) => car.distanceDriven > 0)).toBe(true);
    });
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
        expect(racingGame.maxDistanceDriven).toBe(2);
      });

      test('우승한 자동차를 구할 수 있다.', () => {
        const [winningCar] = racingGame.winningCars;
        const lastCar = cars.at(-1);

        expect(winningCar).toEqual(lastCar);
      });
    });

    describe('우승자가 여러명 일 때', () => {
      test('최대 이동거리와 같은 자동차의 수가 2대이면 우승 자동차의 수는 2대다.', () => {
        racingGame.cars[0].moveForward();
        racingGame.cars[1].moveForward();

        expect(
          racingGame.cars.filter(
            (car) => car.distanceDriven === racingGame.maxDistanceDriven
          ).length
        ).toBe(2);
        expect(racingGame.winningCars.length).toEqual(2);
      });

      test('자동차의 이동거리가 모두 최대 이동거리면 우승자는 모든 자동차다.', () => {
        racingGame.cars.forEach((car) => {
          car.moveForward();
        });

        expect(
          racingGame.cars.every(
            (car) => car.distanceDriven === racingGame.maxDistanceDriven
          )
        ).toBe(true);
        expect(racingGame.winningCars).toEqual(racingGame.cars);
      });
    });
  });

  describe('경주 라운드 테스트', () => {
    test('RacingGame에는 rounds 속성의 초기값은 0이다.', () => {
      expect(racingGame.rounds).toBe(0);
    });

    describe('round 진행시 rounds 값이 하나 증가한다.', () => {
      test.each([1, 2, 3])(
        'round %i번 진행시 rounds 값은 %i이다.',
        (runRoundTimes) => {
          for (let i = 0; i < runRoundTimes; i++) {
            racingGame.runRound();
          }

          expect(racingGame.rounds).toBe(runRoundTimes);
        }
      );
    });

    test(`RacingGame round는 기본 5회동안 진행된다.`, async () => {
      const runRoundSpy = jest.spyOn(racingGame, 'runRound');

      racingGame.startRace(checkCanMoveForward);

      expect(runRoundSpy).toBeCalledTimes(5);

      runRoundSpy.mockRestore();
    });

    describe('생성시 maxRounds가 설정 된다면 해당 maxRounds 만큼 진행한다.', () => {
      test.each([6, 8, 10])(
        'maxRounds를 %i로 설정한 경우',
        async (maxRounds) => {
          racingGame = new RacingGame(cars, maxRounds);
          const runRoundSpy = jest.spyOn(racingGame, 'runRound');

          racingGame.startRace(checkCanMoveForward);

          expect(runRoundSpy).toBeCalledTimes(maxRounds);

          runRoundSpy.mockRestore();
        }
      );
    });

    test('round 진행시 경주 기록이 저장되어 records의 길이가 1 늘어난다', () => {
      const saveRecordSpy = jest.spyOn(racingGame, 'saveCurrentRecord');
      const prevRecordLength = racingGame.records.length;

      racingGame.runRound();

      expect(saveRecordSpy).toBeCalled();
      expect(racingGame.records.length).toBe(prevRecordLength + 1);
    });
  });

  describe('예외처리 테스트', () => {
    describe('생성자 첫번째 파라미터 테스트', () => {
      test.each([[1, 2, 3], ['a', 'b', 'c'], null, undefined])(
        'Car instance가 아닐 때',
        (invalidCars) => {
          expect(() => new RacingGame(invalidCars)).toThrow();
        }
      );
    });

    describe('생성자 두번째 파라미터 테스트', () => {
      test.each(['abc', '1', null, {}])(
        '숫자가 아닐 때',
        (invalidMaxRounds) => {
          expect(() => new RacingGame(cars, invalidMaxRounds)).toThrow();
        }
      );
    });
  });
});
