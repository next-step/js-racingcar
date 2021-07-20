const MESSAGE = {
  NAME_LENGTH_ERROR:
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  COUNT_MINIMUM_ERROR:
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  COUNT_ONLY_NUM_ERROR:
    '입력한 레이싱 횟수가 너무 적습니다. 레이싱 횟수는 1이상이어야 합니다.',
  FINISH: '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇',
};

const PROCESS = {
  MOVE: `<div class='move forward-icon mt-2'>⬇️️</div>`,
  STOP: `<div class='d-flex justify-center mt-3'>
      <div class='relative spinner-container'>
        <span class='material spinner'></span>
      </div>
    </div>
  `,
};

export { MESSAGE, PROCESS };
