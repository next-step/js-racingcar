import { printMessage } from '../../src/utils/printMessage';

describe('printMessage 함수 테스트', () => {
  test('콘솔에 메시지를 올바르게 출력한다.', () => {
    const logSpy = jest.spyOn(console, 'log');
    const message =
      '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).';

    printMessage(message);
    expect(logSpy).toHaveBeenCalledWith(message);

    logSpy.mockRestore();
  });
});
