const ERROR = Object.freeze({
  emptyInput: '입력 값이 없습니다.',
  invalidFormat:
    '입력 형식이 잘못되었습니다. (공백 사용 불가, 콤마 위치를 확인하세요.)',
  duplicateValue: '자동차 이름은 중복될 수 없습니다.',
  invalidSingleValue: '자동차는 최소 두 개부터 입력할 수 있습니다.',
  invalidNameLength: '자동차 이름은 5글자 이내로 입력할 수 있습니다.',
});

export default ERROR;
