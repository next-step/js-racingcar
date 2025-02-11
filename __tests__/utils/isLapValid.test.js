import { isLapValid } from '../../src/domain/game/utils.js';

describe('isLapValid 함수 테스트', () => {
  test('공백으로 입력하면 기본 횟수 설정에 의해 true를 반환한다.', () => {
    const isValid = isLapValid('');

    expect(isValid).toBeTruthy();
  });

  describe('양의 정수로 변환 가능한 string이 들어온 경우', () => {
    test.each([
      ['7', true],
      ['100', true],
    ])('"%s"을(를) 입력하면 true를 반환한다.', (input, expected) => {
      const isValid = isLapValid(input);

      expect(isValid).toBe(expected);
    });
  });

  describe('양의 정수로 변환 불가능한 string이 들어온 경우', () => {
    test.each([
      ['십일', false],
      ['0', false],
      ['3.14', false],
    ])('"%s"을(를) 입력하면 false를 반환한다.', (input, expected) => {
      const isValid = isLapValid(input);

      expect(isValid).toBe(expected);
    });
  });
});
