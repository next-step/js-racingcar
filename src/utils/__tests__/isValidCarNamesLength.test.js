import {isValidCarNamesLength} from '../isValidCarNamesLength';

describe('isValidCarNamesLength test', () => {
  test('자동차 이름은 5자 이하만 가능하다.', () => {
    const validCarNames = ['pobi', 'crong', 'honux'];
    expect(isValidCarNamesLength(validCarNames)).toBe(true);

    const invalidCarNames = ['pobi', 'crong', 'honux1'];
    expect(isValidCarNamesLength(invalidCarNames)).toBe(false);
  });
});
