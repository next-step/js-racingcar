import Racing from '../src/domain/Racing';
import Car from '../src/domain/Car';

const playerList = ['taxi', 'tesla', 'ford'];

describe('자동차 경주 기능 테스트', () => {
  it('n명의 참가자(자동차)를 받을 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.setPlayers(playerList);

    // when
    const playerCount = racing.getPlayerCount();
    const [firstPlayer] = racing.getPlayers();

    // then
    expect(playerCount).toBe(3);
    expect(firstPlayer).toBeInstanceOf(Car);
  });
  it('자동차 경주는 n회로 고정하여 진행한다. (default: 5)', () => {
    // given
    const firstRacing = new Racing();
    const secondRacing = new Racing(10);
    firstRacing.setPlayers(playerList);
    secondRacing.setPlayers(playerList);

    // when
    const firstLapCount = firstRacing.getLapCount();
    const secondLapCount = secondRacing.getLapCount();

    // then
    expect(firstLapCount).toBe(5);
    expect(secondLapCount).toBe(10);
  });
  it('우승자(자동차)는 한 명 이상일 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.setPlayers(playerList);

    // when
    const winners = racing.start().getWinners();

    // then
    expect(winners.length).not.toBe(0);
    expect(winners.length).toBeGreaterThan(0);
    expect(winners.length).toBeLessThanOrEqual(3);
  });
  it('우승자 이름을 알 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.setPlayers(playerList);

    // when
    const winnerNames = racing.start().getWinnerNames();

    // then
    expect(playerList).toEqual(expect.arrayContaining(winnerNames));
  });
});
