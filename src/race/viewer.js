import { RACE_CONFIGURE } from '../constants/index';

/**
 * 자동차 경주 내용을 사용자에게 반환한다.
 * @param {string} car 자동차
 * @param {number} distance 거리
 * @param {string} track 표시 할 트랙
 */
export const createRaceStatusMessage = (car, distance, track) => `${car} : ${track.repeat(distance)}`;

/**
 * 경주 결과를 표시 할 메시지를 반환한다.
 * @param {array} winners 우승자
 */
export const createRaceWinnerMessage = (winners) =>
  `${winners.join(RACE_CONFIGURE.DISPLAY_SEPARATOR)}가 최종 우승하였습니다.`;

/**
 * 사용자 임의의 메시지를 전송한다.
 * @param {string} message 출력할 메시지 *기본 값: 공백("")
 */
export const printMessage = (message = '') => {
  console.log(message);
};
