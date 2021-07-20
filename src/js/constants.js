export const Events = {
  NAME_INPUT_CHANGE: 'changeNameInput',
  NAME_INPUT_DISABLED: 'changeNameBtnDisabled',
  NAME_BTN_DISABLED: 'changeNameBtnDisabled',
  COUNT_FIELD_VISIBLE: 'changeCountFieldVisible',
  COUNT_INPUT_CHANGE: 'changeCountInput',
  COUNT_INPUT_DISABLED: 'changeCountInputDisabled',
  COUNT_BTN_DISABLED: 'changeCountBtnDisabled',
  PROCESS_SECTION_VISIBLE: 'changeProcessSectionVisible',
  PROCESS_PRECEED: 'preceedProcess',
  RESULT_SECTION_VISIBLE: 'changeResultSectionVisible',
  WINNERS_CHANGE: 'changeWinners',
};

export const Messages = {
  EMPTY_NAME: '자동차 이름을 입력해주세요',
  INVALID_NAME: '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  INVALID_COUNT: '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  WINNERS: (winners) => `🏆최종 우승자: ${winners}🏆`,
  END: '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇',
};
