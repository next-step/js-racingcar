import { CAR, RACE } from "./Numbers";

export const MESSAGE = Object.freeze({
  INPUT_CAR_NAMES: `경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).`,
  RESULT_OF_RACE: `실행 결과`,
  WINNER_IS: (carNames) => `${carNames}가 최종 우승했습니다.`,
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_LENGTH: `자동차 이름은 ${CAR.NAME_MIN_LENGTH}글자 이상 ${CAR.NAME_MAX_LENGTH}글자 이하여야 합니다.`,
  MIN_CAR_COUNT_NOT_REACHED: `자동차는 최소 ${RACE.MIN_CAR_COUNT}대 이상이어야 합니다.`,
  DUPLICATE_NAME: `자동차 이름은 중복되지 않아야 합니다.`,
});
