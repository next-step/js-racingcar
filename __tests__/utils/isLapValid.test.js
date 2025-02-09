import { isLapVaild } from '../../src/domains/game/utils.js';

describe('isLapValid 함수 테스트', () => {
  test('"7"을 입력하면 true를 반환한다.', () => {
    const isValid = isLapVaild('7');

    expect(isValid).toBeTruthy();
  });

  test('"십일"을 입력하면 false를 반환한다.', () => {
    const isValid = isLapVaild('십일');

    expect(isValid).toBeFalsy();
  });

  test('공백으로 입력하면 기본 횟수 설정에 의해 true를 반환한다.', () => {
    const isValid = isLapVaild('');

    expect(isValid).toBeTruthy();
  });
});
