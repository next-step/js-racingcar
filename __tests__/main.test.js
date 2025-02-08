import { isInputValid } from '../src/utils';

describe('콘솔 입력에 대한 유효성 검사 동작 테스트', () => {
  test('사용자 입력란에 "아반떼"을 입력하면 유효성 검사는 통과이다.', () => {
    const isValid = isInputValid('아반떼');

    expect(isValid).toBeTruthy();
  });

  test('사용자 입력란에 "아반떼,그렌져"을 입력하면 유효성 검사는 통과이다.', () => {
    const isValid = isInputValid('아반떼,그렌져');

    expect(isValid).toBeTruthy();
  });

  test('사용자 입력란에 "아반떼, 그렌져"을 입력하면 유효성 검사는 통과이다.', () => {
    const isValid = isInputValid('아반떼, 그렌져');

    expect(isValid).toBeTruthy();
  });

  test('사용자 입력란에 "아반떼,"을 입력하면 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid('아반떼,');

    expect(isValid).toBeFalsy();
  });

  test('사용자 입력란에 다섯 글자를 넘는 "그랜드 스타렉스"을 입력하면 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid('그랜드 스타렉스');

    expect(isValid).toBeFalsy();
  });

  test('사용자 입력란에 다섯 글자 초과를 포함되어 단어가 있어도 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid('아반떼, 그랜드 스타렉스');

    expect(isValid).toBeFalsy();
  });

  test('사용자 입력란에 "아반떼,"을 입력하면 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid('아반떼,');

    expect(isValid).toBeFalsy();
  });

  test('사용자 입력란에 공백을 입력하면 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid('');

    expect(isValid).toBeFalsy();
  });

  test('사용자 입력란에 쉼표를 입력하면 유효성 검사는 실패이다.', () => {
    const isValid = isInputValid(',');

    expect(isValid).toBeFalsy();
  });
});
