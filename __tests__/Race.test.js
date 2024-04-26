import Car from "../src/Car";
import Race from "../src/Race";

describe('자동차 경주 테스트', () => {
  test ('자동차 경주는 5회로 고정하여 진행한다', () => {
    // given
    const race = new Race();

    // when
    race.start();

    // then
    expect(race.playNumber).toBe(5);
  });

  test ('자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.', () => {
    // given
    const competitors = [
      { name: 'seol', position: 1 },
      { name: 'tang', position: 2 },
      { name: 'huru', position: 3 }
    ];
    const race = new Race(competitors);

    // when
    race.start();

    // then
    expect(race.winner).toEqual('huru');
  });
})