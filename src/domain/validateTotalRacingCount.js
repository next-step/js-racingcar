export const VALIDATE_TOTAL_RACING_COUNT_ERROR = {
  INVALID_NUMBER: '양의 정수만 입력해주세요.',
};

export const validateTotalRacingCount = totalRacingCountInput => {
  const isOnlyNumber = /^\d+$/.test(totalRacingCountInput);
  if (!isOnlyNumber || totalRacingCountInput < 1) {
    throw new Error(VALIDATE_TOTAL_RACING_COUNT_ERROR.INVALID_NUMBER);
  }
};
