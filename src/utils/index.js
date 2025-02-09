/**
 * 렌덤 정수값을 추출하는 함수
 *
 * @param {number} min 난수의 최소 범위의 값
 * @param {number} max 난수의 최대 범위의 값
 * @returns 랜덤 값
 */
export function getRandomNumber(min = 0, max = 9) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
