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

describe('참가자 명단 입력 Utils', () => {
  test('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {
    // given: 임의의 참가자 명단 입력
    const RANDOM_INPUT = 'pobi,crong,honux';

    // when: 입력값을 쉼표로 구분 시도
    const actualList = Race.parseInput(RANDOM_INPUT);

    // then: 참가자 명단이 쉼표로 구분되었는지 확인
    const expectedList = RANDOM_INPUT.split(',');
    expect(actualList).toEqual(expectedList);
  });

  test('사용자가 잘못된 값을 입력한 경우, 프로그램을 종료한다.', () => {
    // given: 잘못된 참가자 명단 입력
    const WRONG_INPUT = 'pobi#crong#honux';

    // when: 입력값을 쉼표로 구분 시도
    const parseWrongInput = () => Race.parseInput(WRONG_INPUT);

    // then: 프로그램이 종료되는지 확인
    expect(parseWrongInput).toThrow(
      '자동차 이름은 쉼표(,)를 기준으로만 구분할 수 있습니다.'
    );
  });
});
