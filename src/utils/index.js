const MAX_VALUE_LENGTH = 5;

/**
 * 콘솔 입력에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isInputValid(input) {
  const hasSplitedValues = !!input && input.split(',').length > 0;
  const hasNonEmptyValues = input
    .split(',')
    .every(
      (splitedInput) =>
        !!splitedInput &&
        splitedInput.trim().length > 0 &&
        splitedInput.trim().length <= MAX_VALUE_LENGTH,
    );

  return hasSplitedValues && hasNonEmptyValues;
}
