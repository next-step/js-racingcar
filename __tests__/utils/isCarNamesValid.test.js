import { isCarNamesValid } from '../../src/utils/index.js';

describe('isCarNamesValid 함수 테스트', () => {
  describe('쉼표를 어떻게 사용하는냐에 따라 자동차 이름을 구분한다.', () => {
    test('"아반떼,그렌져"을 입력하면 올바르게 처리해야 한다.', () => {
      const isValid = isCarNamesValid('아반떼,그렌져');

      expect(isValid).toBeTruthy();
    });

    test('"아반떼, 그렌져"을 입력하면 올바르게 처리해야 한다.', () => {
      const isValid = isCarNamesValid('아반떼, 그렌져');

      expect(isValid).toBeTruthy();
    });

    test('"아반떼,"을 입력하면 올바르게 처리할 수 없게 한다.', () => {
      const isValid = isCarNamesValid('아반떼,');

      expect(isValid).toBeFalsy();
    });
  });

  describe('5글자 이하의 문자열만 이름으로 사용할 수 있어야 한다.', () => {
    test('"아반떼"을 입력하면 올바른 이름으로 판별한다.', () => {
      const isValid = isCarNamesValid('아반떼');

      expect(isValid).toBeTruthy();
    });

    test('"그랜드 스타렉스"을 입력하면 올바르지 않는 이름으로 판별한다.', () => {
      const isValid = isCarNamesValid('그랜드 스타렉스');

      expect(isValid).toBeFalsy();
    });

    test('"아반떼, 그랜드 스타렉스"을 입력하면 올바르지 않는 이름으로 판별한다.', () => {
      const isValid = isCarNamesValid('아반떼, 그랜드 스타렉스');

      expect(isValid).toBeFalsy();
    });
  });

  describe('사용자가 잘못 입력할 경우도 대비해야 한다.', () => {
    test('쉼표만 입력하면 잘못 입력한 것으로 판단한다.', () => {
      const isValid = isCarNamesValid(',');

      expect(isValid).toBeFalsy();
    });

    test('공백을 입력하면 잘못 입력한 것으로 판단한다.', () => {
      const isValid = isCarNamesValid('');

      expect(isValid).toBeFalsy();
    });
  });
});
