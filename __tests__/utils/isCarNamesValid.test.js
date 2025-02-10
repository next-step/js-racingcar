import { isCarNamesValid } from '../../src/domain/game/utils';

describe('isCarNamesValid 함수 테스트', () => {
  describe('자동차 이름을 쉼표로 구분할 수 있어야 한다.', () => {
    test.each([
      ['아반떼,그렌져', true],
      ['아반떼, 그렌져', true],
      ['아반떼,', false],
    ])('"%s"을(를) 입력하면 %s을(를) 반환한다.', (input, expected) => {
      const isValid = isCarNamesValid(input);

      expect(isValid).toBe(expected);
    });
  });

  describe('자동차 이름은 최대 5글자까지만 허용해야 한다.', () => {
    test.each([
      ['제네시스', true], // 4글자
      ['아이오닉5N', false], // 6글자
      ['아반떼, 그랜드 스타렉스', false], // 하나라도 5글자 초과
    ])('"%s"을(를) 입력하면 %s을(를) 반환한다.', (input, expected) => {
      const isValid = isCarNamesValid(input);

      expect(isValid).toBe(expected);
    });
  });

  describe('잘못된 입력 값 처리', () => {
    test.each([
      [',', false], // 쉼표만 입력
      ['', false], // 빈 문자열 입력
    ])('"%s"을(를) 입력하면 %s을(를) 반환한다.', (input, expected) => {
      const isValid = isCarNamesValid(input);

      expect(isValid).toBe(expected);
    });
  });
});
