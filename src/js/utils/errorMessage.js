import { MAX_CAR_NAME_LENGTH } from "./constant.js";

export const CAR_FACTORY_ERROR_MESSAGES = {
  CAR_NAME_IS_EMPTY: "자동차 이름은 1글자 이상으로 입력해주세요.",
  CAR_NAME_LOGGER_THAN_MAX_LENGTH: `자동차 이름의 글자 수는 ${MAX_CAR_NAME_LENGTH}보다 적어야합니다.`,
  CAR_NAMES_DUPLICATED: "차량 이름이 중복되지 않게 입력해주세요.",
};

export const ROUNDS_INPUT_ERROR_MESSAGES = {
  ROUNDS_IN_NOT_POSITIVE_INTEGER: "0보다 큰 양의 정수를 입력해주세요.",
};
