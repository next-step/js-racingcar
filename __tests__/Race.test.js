import Car from '../src/domain/Car';
import Race from '../src/domain/Race';

describe('자동차 경주는', () => {
  let race;

  beforeEach(() => {
    // given: 임의의 자동차들이 경주에 참가한 경우를 가정
    race = new Race([new Car('pobi'), new Car('crong'), new Car('honux')]);
  });

  test('5라운드로 진행한다.', () => {
    // when: 경주 시작
    jest.spyOn(race, 'initRound');
    race.initRace();

    // then: 자동차 경주가 5라운드로 진행되는지 확인
    expect(Race.ROUNDS).toBe(5);
    expect(race.initRound).toHaveBeenCalledTimes(Race.ROUNDS);
  });

  test('한 명 이상의 우승자가 발생할 수 있다.', () => {
    // when: 경주 시작
    race.initRace();

    // then: 우승자가 한 명 이상인지 확인
    expect(race.winners.length).toBeGreaterThanOrEqual(1);
  });
});
