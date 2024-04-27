import RacingGame from '../src/Domain/RacingGame';
import Car from '../src/Domain/Car';

/* 
경주 컨트롤러
- 자동차 경주는 5회로 고정하여 진행한다.
- 자동차 경주 게임을 완료한 후 우승자를 선별한다. (우승자는 한 명 이상일 수 있다.)
*/

describe('경주 게임 테스트', () => {
  test('자동차 경주는 5회 진행한다.', () => {
    // given
    const cars = [new Car('pobi'), new Car('crong'), new Car('honux')];
    const racingGame = new RacingGame(cars);

    // when
    racingGame.start();

    // then
    expect(racingGame.round).toBe(5);
  });

  test('자동차 경주 게임을 완료한 후 우승자를 선별한다.', () => {
    // given
    const cars = [new Car('pobi'), new Car('crong'), new Car('honux')];
    const racingGame = new RacingGame(cars);

    Car.getRandomNumber = jest
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
