const MAX_VALUE_LENGTH = 5;

/**
 * 자동차 이름들에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isCarNamesValid(input) {
  if (!input) return false;

  const splitedValues = input.split(',').map((value) => value.trim());

  const hasSplitedValues = splitedValues.length > 0;
  const hasEmptyValues = splitedValues.some(
    (value) => value.length === 0 || value.length > MAX_VALUE_LENGTH,
  );

  return hasSplitedValues && !hasEmptyValues;
}

/**
 * 자동차 경주 횟수 입력에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isLapValid(input) {
  if (!input) return true; // 빈 값으로 입력하면 기본 횟수로 설정

  const inputNumber = Number(input);

  return (
    !isNaN(inputNumber) && Number.isInteger(inputNumber) && inputNumber > 0
  );
}
