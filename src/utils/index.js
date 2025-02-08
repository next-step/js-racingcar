const MAX_VALUE_LENGTH = 5;

/**
 * 자동차 이름들에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isCarNamesValid(input) {
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

/**
 * 자동차 경주 횟수 입력에 대한 유효성 검사 함수
 *
 * @param {string | undefined} input 입력 받은 값
 * @returns 해당 입력값이 유효한지 여부
 */
export function isLapVaild(input) {
  if (!input) return true; // 빈 값으로 입력하면 기본 횟수로 설정

  return !isNaN(Number(input));
}

/**
 * 렌덤 정수값을 추출하는 함수
 *
 * @param {number} min 난수의 최소 범위의 값
 * @param {number} max 난수의 최대 범위의 값
 * @returns 랜덤 값
 */
export function getRandomNumber(min = 0, max = 10000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
