import { MAX_CAR_NAME_LENGTH, RACE_FORWARD_RANDOM_NUMBER_LIMIT } from "./rules";

export const ERROR_MESSAGE = {
  maxCarNameLength: `자동차 이름은 ${MAX_CAR_NAME_LENGTH}자를 넘길 수 없습니다.`,
  duplicateCarName: "자동차 이름은 중복될 수 없습니다.",
  noEmptyName: "자동차 이름은 빈값일 수 없습니다.",
  invalidInput: "잘못된 입력 값을 작성한 경우, 프로그램을 종료합니다.",
  raceForwardNumberLimit: `무작위 숫자 값이 ${RACE_FORWARD_RANDOM_NUMBER_LIMIT}이상이여야 한다.`,
};
