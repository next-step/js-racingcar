import {validateCarNames, MAXIMUM_CAR_NAME_LENGTH, VALIDATE_CAR_NAMES_ERRORS} from '../validateCarNames';

describe('validateCarNames 함수 테스트', () => {
  test.each([',', '', 'a,'])(`%s에는 빈 문자열이 있기 때문에 empty 에러가 발생한다.`, text => {
    expect(() => validateCarNames(text)).toThrow(VALIDATE_CAR_NAMES_ERRORS.EMPTY_CAR_NAME);
  });
  test.each(['abcdef', '1,012345', '      ,1', '1, 3, abcde'])(
    `%s에는 ${MAXIMUM_CAR_NAME_LENGTH}자가 넘어가는 이름이 있기 때문에 길이 제한 에러가 발생한다.`,
    text => {
      expect(() => validateCarNames(text)).toThrow(VALIDATE_CAR_NAMES_ERRORS.OVER_LENGTH);
    },
  );
});
