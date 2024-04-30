import { parseInput } from '../src/utils/input';

describe('참가자 명단 입력 Utils', () => {
  test('자동차 이름은 쉼표(`,`)를 기준으로 구분한다.', () => {
    // given: 임의의 참가자 명단 입력
    const RANDOM_INPUT = 'pobi,crong,honux';

    // when: 입력값을 쉼표로 구분
    const actualList = parseInput(RANDOM_INPUT);

    // then: 참가자 명단이 쉼표로 구분되었는지 확인
    const expectedList = RANDOM_INPUT.split(',');
    expect(actualList).toEqual(expectedList);
  });
});
