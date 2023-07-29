import {isExistOverLengthText} from '../isExistOverLengthText';

describe('isExistOverLengthText test', () => {
  const LENGTH_THRESHHOLD = 5;

  test('길이를 넘는 문자열이 존재한다', () => {
    const invalidCarNames = ['pobi', 'crong', 'honux1'];
    expect(isExistOverLengthText(invalidCarNames, LENGTH_THRESHHOLD)).toBe(false);
  });

  test('길이를 넘는 문자열이 존재하지 않는다', () => {
    const validCarNames = ['pobi', 'crong', 'honux'];
    expect(isExistOverLengthText(validCarNames, LENGTH_THRESHHOLD)).toBe(true);
  });

  test('0이상의 정수가 아니면 에러가 발생한다.', () => {
    const invalidLengthThreshhold = -1;
    expect(() => isExistOverLengthText([], invalidLengthThreshhold)).toThrow();
  });
});
