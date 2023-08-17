export const NEWLINE = "\n";

export const INFORMATION = Object.freeze({
  INPUT: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).",
  STATUS: "\n실행 결과",
  WINNERS: (winners) => `${winners}가 최종 우승했습니다.`,
});

export const ERROR_CAR_NAME = Object.freeze({
  MAX_LENGTH: (MAX_LENGTH) =>
    `자동차는 이름은 ${MAX_LENGTH}자 이하만 가능합니다.`,
  MIN_LENGTH: (MIN_LENGTH) =>
    `자동차는 이름은 ${MIN_LENGTH}자 이상만 가능합니다.`,
  PATTERN: "자동차 이름은 영어 문자열만 가능합니다.",
  UINIQUE: "중복되는 이름은 허용하지 않습니다.",
});

export const ERROR_NUMBER = Object.freeze({
  MIN_LESS_THAN_MAX: "최소값은 최대값보다 작아야 합니다.",
  COMPARISON_OPERATOR: "잘못된 비교 연산자입니다.",
});
