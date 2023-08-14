import {validateTotalRacingCount, VALIDATE_TOTAL_RACING_COUNT_ERROR} from '../validateTotalRacingCount';

describe('validateTotalRacingCount 함수 테스트', () => {
  test.each(['1', '2', '10', '100'])(
    '"%s"는 양의 정수이므로 validateTotalRacingCount 함수 에러가 발생하지 않는다.',
    text => {
      expect(() => validateTotalRacingCount(text)).not.toThrow();
    },
  );

  test.each(['0', '-1', '1.1', 'a', '-', '100.1', '0.1', '1 '])(
    `"%s"는 양의 정수가 아니므로 validateTotalRacingCount 함수 에러가 발생한다.`,
    text => {
      expect(() => validateTotalRacingCount(text)).toThrow(VALIDATE_TOTAL_RACING_COUNT_ERROR.INVALID_NUMBER);
    },
  );
});
