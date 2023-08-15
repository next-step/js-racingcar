import { RACE_CONFIGURE, ALERT_MESSAGE } from '../constants/index';

const { TRACK, DISPLAY_SEPARATOR } = RACE_CONFIGURE;
/**
 * 자동차 경주 내용 메시지를 반환한다.
 * @param {array} history 경주 기록
 */
export const createRaceStatusMessage = (history) =>
  history.map(({ cars }) => cars.map(({ car, distance }) => `${car} : ${TRACK.repeat(distance)}`));

/**
 * 경주 결과를 표시 할 메시지를 반환한다.
 * @param {array} winners 우승자
 */
export const createRaceWinnerMessage = (winners) => `${winners.join(DISPLAY_SEPARATOR)}${ALERT_MESSAGE.WINNER_MESSAGE}`;
