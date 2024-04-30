import { parseInput } from '../src/utils/input';

describe('참가자 명단 입력 Utils', () => {
  test('자동차 이름은 쉼표(,)를 기준으로 구분한다.', () => {
    // given: 임의의 참가자 명단 입력
    const RANDOM_INPUT = 'pobi,crong,honux';

    // when: 입력값을 쉼표로 구분 시도
    const actualList = parseInput(RANDOM_INPUT);

    // then: 참가자 명단이 쉼표로 구분되었는지 확인
    const expectedList = RANDOM_INPUT.split(',');
    expect(actualList).toEqual(expectedList);
  });

  test('사용자가 잘못된 값을 입력한 경우, 프로그램을 종료한다.', () => {
    // given: 잘못된 참가자 명단 입력
    const WRONG_INPUT = 'pobi#crong#honux';

    // when: 입력값을 쉼표로 구분 시도
    const parseWrongInput = () => parseInput(WRONG_INPUT);

    // then: 프로그램이 종료되는지 확인
    expect(parseWrongInput).toThrow(
      '자동차 이름은 쉼표(,)를 기준으로만 구분할 수 있습니다.'
    );
  });
});
