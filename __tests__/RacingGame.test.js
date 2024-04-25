import RacingGame from '../src/RacingGame';

/* 
경주 컨트롤러
- 자동차 경주는 5회로 고정하여 진행한다.
- 자동차는 쉼표를 기준으로 구분한다.
- 자동차 경주 게임을 완료한 후 우승자를 선별한다. (우승자는 한 명 이상일 수 있다.)
*/

describe('경주 게임 테스트', () => {
  test('자동차 경주는 5회 진행한다.', () => {
    // given
    const racingGame = new RacingGame();

    // when
    racingGame.start();

    // then
    expect(racingGame.round).toBe(5);
  });
});
