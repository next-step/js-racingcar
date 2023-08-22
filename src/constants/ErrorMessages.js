import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  RACE_MIN_CAR_COUNT,
} from "./Numbers";

const INVALID_CAR_NAME_LENGTH = `자동차 이름은 ${CAR_NAME_MIN_LENGTH}글자 이상 ${CAR_NAME_MAX_LENGTH}글자 이하여야 합니다.`;
const MIN_CAR_COUNT_NOT_REACHED = `자동차는 최소 ${RACE_MIN_CAR_COUNT}대 이상이어야 합니다.`;
const DUPLICATE_NAME = `자동차 이름은 중복되지 않아야 합니다.`;
const INVALID_NUM_OF_ROUND = `회수는 1 이상의 숫자로 입력해주세요.`;

export {
  DUPLICATE_NAME,
  INVALID_CAR_NAME_LENGTH,
  INVALID_NUM_OF_ROUND,
  MIN_CAR_COUNT_NOT_REACHED,
};
