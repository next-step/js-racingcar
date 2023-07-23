import Car from '../src/Car';
import RacingGame from '../src/RacingGame';

describe('레이싱 게임 세팅 테스트', () => {
  test('경주에 참여할 자동차들이 있다.', () => {
    const racingGame = new RacingGame(['자동차1', '자동차2', '자동차3']);

    expect(racingGame.getCars().every((car) => car instanceof Car)).toBe(true);
  });
});
