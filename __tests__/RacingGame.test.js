import CONSTANTS from '../src/constants/Constants';
import ERROR from '../src/constants/Error';
import Car from '../src/Domain/Car';
import RacingGame from '../src/Domain/RacingGame';
import Random from '../src/utils/Random';

/* 
경주 컨트롤러
- 자동차 경주는 5회로 고정하여 진행한다.
- 자동차 경주 게임을 완료한 후 우승자를 선별한다. (우승자는 한 명 이상일 수 있다.)
*/

describe('경주 게임 테스트', () => {
  describe('정상 케이스 테스트', () => {
    test('자동차 경주는 5회 진행한다.', () => {
      // given
      const cars = [new Car('pobi'), new Car('crong'), new Car('honux')];
      const racingGame = new RacingGame(cars);

      // when
      racingGame.start();

      // then
      expect(racingGame.round).toBe(CONSTANTS.racingGame.roundConfig);
    });

    test('자동차 경주 게임을 완료한 후 우승자를 선별한다.', () => {
      // given
      const cars = [new Car('pobi'), new Car('crong'), new Car('honux')];
      const racingGame = new RacingGame(cars);

      Random.getRandomNumber = jest
        .fn()
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1)
        .mockReturnValue(9);

      // when
      racingGame.start();

      // then
      expect(racingGame.winners).toEqual([racingGame.cars[2]]);
    });
  });

  describe('예외 케이스 테스트', () => {
    test.each([
      [[new Car('pobi'), new Car('cr ng')]],
      [[new Car(' pobi'), new Car('crong')]],
      [[new Car(' '), new Car('crong')]],
    ])('자동차 이름에 공백이 포함된 경우 예외 처리한다.', input => {
      // given
      const cars = input;

      // when + then
      expect(() => new RacingGame(cars)).toThrow(ERROR.invalidFormat);
    });

    test('빈 자동차 이름이 있는 경우 예외 처리한다.', () => {
      // given
      const cars = [new Car(''), new Car('crong')];

      // when + then
      expect(() => new RacingGame(cars)).toThrow(ERROR.invalidFormat);
    });

    test('중복된 자동차가 존재하는 경우 예외 처리한다.', () => {
      // given
      const cars = [new Car('pobi'), new Car('pobi'), new Car('crong')];

      // when + then
      expect(() => new RacingGame(cars)).toThrow(ERROR.duplicateValue);
    });

    test('자동차가 한 개인 경우 예외 처리한다.', () => {
      // given
      const cars = [new Car('pobi')];

      // when + then
      expect(() => new RacingGame(cars)).toThrow(ERROR.invalidSingleValue);
    });
  });
});
