class Validator {
  static inputLength = 5;

  static carNameValidate(inputValue) {
    const value = inputValue.toString().trim();

    if (!value) {
      throw new Error("자동차 이름 입력값이 비었습니다.");
    }
    if (value.length > this.inputLength) {
      throw new Error(`자동차 이름은 ${this.inputLength}자 이하만 가능합니다.`);
    }
  }
}

export default Validator;
