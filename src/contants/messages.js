export const INPUT_MSG =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";
export const TOTAL_ROUND_MSG = "\n실행 결과";
export const ROUND_MSG = (round) => `${round}라운드`;
export const RESULT_MSG = (winners) => `${winners}가 최종 우승했습니다.\n`;

export const ERROR_MSG = Object.freeze({
  MAX_LENGTH: (MAX_LENGTH) =>
    `자동차는 이름은 ${MAX_LENGTH}자 이하만 가능하다.`,
  MIN_LENGTH: (MIN_LENGTH) =>
    `자동차는 이름은 ${MIN_LENGTH}자 이상만 가능하다.`,
  PATTERN: "자동차 이름은 영어 문자열만 가능하다.",
  UINIQUE: "중복되는 이름은 허용하지 않는다.",
});
