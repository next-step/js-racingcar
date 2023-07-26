import {isValidCarNames} from '../isValidCarNames';

describe('isValidCarNames test', () => {
  test('자동차 이름은 5자 이하만 가능하다.', () => {
    const validCarNames = ['pobi', 'crong', 'honux'];
    expect(isValidCarNames(validCarNames)).toBe(true);

    const invalidCarNames = ['pobi', 'crong', 'honux1'];
    expect(isValidCarNames(invalidCarNames)).toBe(false);
  });
});
