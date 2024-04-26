import Racing from '../src/domain/Racing';
import Car from '../src/domain/Car';

const playerList = ['taxi', 'tesla', 'ford'];

describe('자동차 경주 기능 테스트', () => {
  it('n명의 참가자(자동차)를 받을 수 있다.', () => {
    // given
    const players = new Racing(playerList);

    // when
    const playerCount = players.getPlayerCount();
    const [firstPlayer] = players.getPlayers();

    // then
    expect(playerCount).toBe(3);
    expect(firstPlayer).toBeInstanceOf(Car);
  });
  it('자동차 경주는 n회로 고정하여 진행한다. (default: 5)', () => {
    // given
    const firstRacingPlayers = new Racing(playerList);
    const secondRacingPlayers = new Racing(playerList, 10);

    // when
    const firstLapCount = firstRacingPlayers.getLapCount();
    const secondLapCount = secondRacingPlayers.getLapCount();

    // then
    expect(firstLapCount).toBe(5);
    expect(secondLapCount).toBe(10);
  });
  it('우승자(자동차)는 한 명 이상일 수 있다.', () => {
    // given
    const players = new Racing(playerList);

    // when
    const winners = players.start().getWinners();

    // then
    expect(winners.length).not.toBe(0);
    expect(winners.length).toBeGreaterThan(0);
    expect(winners.length).toBeLessThanOrEqual(3);
  });
  it('우승자 이름을 알 수 있다.', () => {
    // given
    const players = new Racing(playerList);

    // when
    const winnerNames = players.start().getWinnerNames();

    // then
    expect(playerList).toEqual(expect.arrayContaining(winnerNames));
  });
});
