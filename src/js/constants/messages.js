import { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from "./car.js";

const ALERT_MESSAGE = {
  INVALID_CAR_NAME_LENGTH: `자동차의 이름은 ${CAR_NAME_MIN_LENGTH} ~ ${CAR_NAME_MAX_LENGTH}자로 입력해주세요.`,
  DUPLICATE_CAR_NAME: "중복되는 자동차 이름을 사용할 수 없습니다.",
};

export { ALERT_MESSAGE };
