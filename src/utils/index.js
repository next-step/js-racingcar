const MAX_VALUE_LENGTH = 5;

/**
 * 콘솔 입력에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isInputValid(input) {
  if (!input) return false;

  const splitedValues = input.split(',');

  const hasSplitedValues = splitedValues.length > 0;
  const hasEmptyValues = splitedValues.some(
    (splitedInput) =>
      splitedInput.trim().length === 0 ||
      splitedInput.trim().length > MAX_VALUE_LENGTH,
  );

  return hasSplitedValues && !hasEmptyValues;
}
