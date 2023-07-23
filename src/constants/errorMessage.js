import { CAR_NAME_LENGTH_LIMITS } from "./rules";

export const ERROR_MESSAGE = {
  maxCarNameLength: `자동차 이름은 ${CAR_NAME_LENGTH_LIMITS.max}자를 넘길 수 없습니다.`,
  duplicateCarName: "자동차 이름은 중복될 수 없습니다.",
  noEmptyName: "자동차 이름은 빈값일 수 없습니다.",
};
