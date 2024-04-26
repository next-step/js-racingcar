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
  })
})