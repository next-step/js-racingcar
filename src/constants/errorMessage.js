import { MAX_CAR_NAME_LENGTH } from "./rules";

export const NO_EMPTY_NAME = "NO_EMPTY_NAME";
export const NO_EMPTY_STRING = "noEmptyString";
export const NO_DUPLICATE_NAME = "NO_DUPLICATE_NAME";
export const NUMBER_REQUIRED = "NUMBER_REQUIRED";
export const MAX_LENGTH_CAR_NAME = "MAX_LENGTH_CAR_NAME";
export const INVALID_INPUT = "INVALID_INPUT";

export const ERROR_MESSAGE = {
  [MAX_LENGTH_CAR_NAME]: `이름은 ${MAX_CAR_NAME_LENGTH}자를 넘길 수 없습니다.`,
  [NUMBER_REQUIRED]: `1 이상 숫자만 입력해주세요.`,
  [NO_DUPLICATE_NAME]: "이름은 중복될 수 없습니다.",
  [NO_EMPTY_STRING]: "빈 값일 수 없습니다.",
  [NO_EMPTY_NAME]: "이름은 빈값일 수 없습니다.",
  [INVALID_INPUT]: "잘못된 입력 값을 작성한 경우, 프로그램을 종료합니다.",
};
