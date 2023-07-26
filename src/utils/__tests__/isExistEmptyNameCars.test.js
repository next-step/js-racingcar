import {isExistEmptyNameCars} from '../isExistEmptyNameCars';

describe('isExistEmptyNameCars test', () => {
  test('자동차 이름은 공백이 될 수 없다.', () => {
    const validCarNames = ['pobi', 'crong', 'honux'];
    expect(isExistEmptyNameCars(validCarNames)).toBe(false);

    const invalidCarNames = ['pobi', 'crong', ''];
    expect(isExistEmptyNameCars(invalidCarNames)).toBe(true);
  });
});
