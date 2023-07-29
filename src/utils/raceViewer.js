import { ALERT_MESSAGE } from '../constants/index';

/**
 * 자동차 경주 내용을 사용자에게 출력한다.
 * @param {string} car 자동차
 * @param {number} distance 거리
 * @param {string} track 표시 할 트랙
 */
export const printRace = (car, distance, track) => {
  console.log(ALERT_MESSAGE.RACE_STATUS_MESSAGE(car, distance, track));
};

/**
 * 경주 결과를 출력한다.
 * @param {array} winners 우승자
 */
export const printResult = (winners) => {
  console.log(ALERT_MESSAGE.RACE_FINISH_MESSAGE(winners));
};
