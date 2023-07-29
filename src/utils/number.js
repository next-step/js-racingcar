/**
 * @desc 입력 받은 경계 범위에 따라 무작위 숫자를 생성해서 반환한다.
 * @param {number} min : 최소 숫자
 * @param {number} max : 최대 숫자
 * @returns
 */
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export default generateRandomNumber;
