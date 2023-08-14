import {isPositiveInteger} from '../isPositiveInteger';

describe('isPositiveInteger function test', () => {
  test.each([
    [1, true],
    [221221221221, true],
    [3232132, true],
    [1000022222, true],
  ])('isPositiveInteger는 양의 정수 %i에 대해 true를 반환한다.', number => {
    expect(isPositiveInteger(number)).toBe(true);
  });

  test.each([
    [0, false],
    [-1, false],
    [11.1, false],
    [-3232132, false],
    [-100.0, false],
  ])('isPositiveInteger는 양의 정수가 아닌 %i에 대해 false를 반환한다.', number => {
    expect(isPositiveInteger(number)).toBe(false);
  });
});
