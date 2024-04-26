import Racing from '../src/domain/Racing';
import Car from '../src/domain/Car';

describe('자동차 경주 기능 테스트', () => {
  it('n명의 참가자(자동차)를 받을 수 있다.', () => {
    // given
    const players = new Racing(['taxi', 'tesla', 'ford']);

    // when
    const playerCount = players.getPlayerCount();
    const [firstPlayer] = players.getPlayers();

    // then
    expect(playerCount).toBe(3);
    expect(firstPlayer).toBeInstanceOf(Car);
  });
  it('자동차 경주는 n회로 고정하여 진행한다. (default: 5)', () => {
    // given
    const firstRacingPlayers = new Racing(['taxi', 'tesla', 'ford']);
    const secondRacingPlayers = new Racing(['taxi', 'tesla', 'ford'], 10);

    // when
    const firstLapCount = firstRacingPlayers.getLapCount();
    const secondLapCount = secondRacingPlayers.getLapCount();

    // then
    expect(firstLapCount).toBe(5);
    expect(secondLapCount).toBe(10);
  });
});
