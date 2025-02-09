import { isCarNamesValid } from '../../src/domains/game/utils';

describe('isCarNamesValid 함수 테스트', () => {
  describe('쉼표를 어떻게 사용하는냐에 따라 자동차 이름을 구분한다.', () => {
    test('"아반떼,그렌져"을 입력하면 true로 반환한다.', () => {
      const isValid = isCarNamesValid('아반떼,그렌져');

      expect(isValid).toBeTruthy();
    });

    test('"아반떼, 그렌져"을 입력하면 true로 반환한다.', () => {
      const isValid = isCarNamesValid('아반떼, 그렌져');

      expect(isValid).toBeTruthy();
    });

    test('"아반떼,"을 입력하면 false로 반환한다.', () => {
      const isValid = isCarNamesValid('아반떼,');

      expect(isValid).toBeFalsy();
    });
  });

  describe('5글자 이하의 문자열만 이름으로 사용할 수 있어야 한다.', () => {
    // 4글자
    test('"제네시스"을 입력하면 true를 반환한다.', () => {
      const isValid = isCarNamesValid('제네시스');

      expect(isValid).toBeTruthy();
    });

    // 6글자
    test('"아이오닉5N"을 입력하면 false로 반환한다.', () => {
      const isValid = isCarNamesValid('아이오닉5N');

      expect(isValid).toBeFalsy();
    });

    test('"아반떼, 그랜드 스타렉스"을 입력하면 false로 반환한다.', () => {
      const isValid = isCarNamesValid('아반떼, 그랜드 스타렉스');

      expect(isValid).toBeFalsy();
    });
  });

  describe('사용자가 잘못 입력할 경우도 대비해야 한다.', () => {
    test('쉼표만 입력하면 false로 반환한다.', () => {
      const isValid = isCarNamesValid(',');

      expect(isValid).toBeFalsy();
    });

    test('공백을 입력하면 false로 반환한다.', () => {
      const isValid = isCarNamesValid('');

      expect(isValid).toBeFalsy();
    });
  });
});
