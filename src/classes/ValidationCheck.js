export default class ValidationCheck {
  // 이름이 비어있는지
  validateEmptyName(carList) {
    carList.forEach((car) => {
      if (car === "") throw new Error("빈 값은 입력할 수 없습니다.");
    });
  }

  // 이름이 중복되었는지
  validateDuplicateName(carList) {}

  // 특수 문자가 들어가있는지
  validateNameRegex(carList) {}

  // 이름의 길이가 5이상인지
  validateNameLength(carList) {}

  // 입력한 차의 개수가 1개 이상인지
  validateCarCount(carList) {
    if (carList.length < 2) throw new Error("2개 이상의 자동차를 입력해주세요.");
  }
}
