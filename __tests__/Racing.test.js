import Racing from '../src/domain/Racing';

describe('자동차 경주 기능 테스트', () => {
  it('n명의 참가자(자동차)를 받을 수 있다.', () => {
    // given
    const players = new Racing(['taxi', 'tesla', 'ford']);

    // when
    const playerCount = players.getPlayerCount();

    // then
    expect(playerCount).toBe(3);
  });
});
