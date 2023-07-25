export const INPUT_MESSAGE = Object.freeze({
  RACING_CAR:
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
});

export const ERROR_MESSAGE = {
  MORE_FIVE_CHARACTERS: '[ERROR] : 자동차를 5자 이하로만 입력해주세요.',
  DUPLICATE_CAR_NAMES: '[ERROR] : 중복된 자동차 이름이 존재합니다.',
  NOT_MESSAGE: '[ERROR] - 입력 받을 메시지가 없습니다.',
};

export const OUTPUT_MESSAGE = Object.freeze({
  RESULT: '\n실행 결과',
  WINNERS: (winners) => `${winners}가 최종 우승했습니다.`,
});
