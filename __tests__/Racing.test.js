import Racing from '../src/domain/Racing';
import Car from '../src/domain/Car';

const playerList = ['taxi', 'tesla', 'ford'];

describe('자동차 경주 기능 테스트', () => {
  it('n명의 참가자(자동차)를 받을 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.players = playerList;

    // when
    const playerCount = racing.getPlayerCount();
    const [firstPlayer] = racing.players;

    // then
    expect(playerCount).toBe(3);
    expect(firstPlayer).toBeInstanceOf(Car);
  });
  it('자동차 경주는 n회로 고정하여 진행한다. (default: 5)', () => {
    // given
    const firstRacing = new Racing();
    const secondRacing = new Racing(10);
    firstRacing.players = playerList;
    secondRacing.players = playerList;

    // when
    const firstRacingMaxLap = firstRacing.maxLap;
    const secondRacingMaxLap = secondRacing.maxLap;

    // then
    expect(firstRacingMaxLap).toBe(5);
    expect(secondRacingMaxLap).toBe(10);
  });
  it('우승자(자동차)는 한 명 이상일 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.players = playerList;
    racing.start().end();

    // when
    const winners = racing.winners;

    // then
    expect(winners.length).toBeGreaterThan(0);
    expect(winners.length).toBeLessThanOrEqual(3);
  });
  it('우승자 이름을 알 수 있다.', () => {
    // given
    const racing = new Racing();
    racing.players = playerList;
    racing.start().end();

    // when
    const winnerNames = racing.getWinnersName();

    // then
    expect(playerList).toEqual(expect.arrayContaining(winnerNames));
  });
});
