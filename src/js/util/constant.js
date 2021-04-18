export const MAX_CARNAME_LENGTH = 5;
export const MAX_ATTEMPT_COUNT = 15;
export const MESSAGE = {
  INVALID_CARNAME_LENGTH: `유효하지 않은 길이의 자동차 이름입니다! 자동차의 이름은 1자 이상, 5자 이하로 입력해주세요.`,
  BLANK_CARNAME_INPUT: "자동차 이름은 공백일 수 없습니다!",
  INVALID_ATTEMPT_COUNT: `시도 횟수는 ${MAX_ATTEMPT_COUNT}회 이하만 가능합니다!`,
  CONGRATURATION: (winners) => `${winners.join(", ")}가 우승했습니다!`,
};
