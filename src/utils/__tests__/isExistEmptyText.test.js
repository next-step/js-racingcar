import {isExistEmptyText} from '../isExistEmptyText';

describe('isExistEmptyText test', () => {
  test('문자열들중 빈 문자열이 존재하지 않는다.', () => {
    const validCarNames = ['pobi', 'crong', 'honux', ' '];
    expect(isExistEmptyText(validCarNames)).toBe(false);
  });

  test('문자열들중 빈 문자열이 존재한다.', () => {
    const invalidCarNames = ['pobi', 'crong', ''];
    expect(isExistEmptyText(invalidCarNames)).toBe(true);
  });
});
