import Car from '../src/domain/Car';

describe('자동차 경주는', () => {
  test('5라운드로 진행한다.', () => {
    // given: 임의의 자동차들이 경주에 참가한 경우를 가정
    const race = new Race([
      new Car('pobi'),
      new Car('crong'),
      new Car('honux'),
    ]);

    // when: 경주 시작
    race.initRace();

    // then: 자동차 경주가 5라운드로 진행되는지 확인
    expect(Race.rounds).toBe(5);
    expect(race.initRound).toHaveBeenCalledTimes(Race.rounds);
  });
});
