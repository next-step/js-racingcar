import {isPositiveInteger} from '../isPositiveInteger';

describe('양의 정수 test', () => {
  test.each([
    [1, true],
    [221221221221, true],
    [3232132, true],
    [1000022222, true],
  ])('%i는 양의 정수이다.', number => {
    expect(isPositiveInteger(number)).toBe(true);
  });

  test.each([
    [0, false],
    [-1, false],
    [11.1, false],
    [-3232132, false],
    [-100.0, false],
  ])('%i는 양의 정수가 아니다.', number => {
    expect(isPositiveInteger(number)).toBe(false);
  });
});
