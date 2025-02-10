import { isLapVaild } from '../../src/domain/game/utils.js';

describe('isLapValid 함수 테스트', () => {
  test.each([
    ['7', true],
    ['십일', false],
  ])('"%s"을(를) 입력하면 %s을(를) 반환한다.', (input, expected) => {
    const isValid = isLapVaild(input);

    expect(isValid).toBe(expected);
  });

  test('공백으로 입력하면 기본 횟수 설정에 의해 true를 반환한다.', () => {
    const isValid = isLapVaild('');

    expect(isValid).toBeTruthy();
  });
});
