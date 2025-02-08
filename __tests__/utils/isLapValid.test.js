import { isLapVaild } from '../../src/utils/index.js';

describe('isLapValid 함수 테스트', () => {
  test('"7"을 입력하면 올바르게 처리해야 한다.', () => {
    const isValid = isLapVaild('7');

    expect(isValid).toBeTruthy();
  });

  test('"십일"을 입력하면 올바르게 처리할 수 없게 한다.', () => {
    const isValid = isLapVaild('십일');

    expect(isValid).toBeFalsy();
  });

  test('공백으로 입력하면 기본 횟수 설정에 의해 올바르게 처리해야 한다.', () => {
    const isValid = isLapVaild('');

    expect(isValid).toBeTruthy();
  });
});
