const request = Object.freeze({
  inputData:
    '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n',
});

const output = Object.freeze({
  gameResult: '\n실행 결과',
  gameWinner: '가 최종 우승했습니다',
});

const MESSAGES = Object.freeze({
  request,
  output,
});

export default MESSAGES;
