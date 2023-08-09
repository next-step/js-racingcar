import { validateMaxLength } from "../src/controller/validator";
import { ERROR_MESSAGE } from "../src/constants/ErrorMessage";
import { MAX_CAR_NAME_LENGTH } from "../src/constants/rules";
import {
  validateDuplicationItemList,
  validateEmptyString,
} from "../src/validator";

describe("RacingCarGameController 사용자가 입력하는 데이터", () => {
  const duplicateNameList = ["frank", "frank"];
  const invalidNameList = ["", "123456", "frank", "frank"];

  test("사용자가 입력 값 validation 중복 유효성 검사한다. ", () => {
    expect(() => validateDuplicationItemList(duplicateNameList)).toThrow(
      ERROR_MESSAGE.duplicateName
    );
  });
  test("Max length 유효성 검사, empty string  유효성검사", () => {
    try {
      validateEmptyString(invalidNameList);
      validateMaxLength(invalidNameList);
    } catch (error) {
      invalidNameList.forEach(name => {
        if (!name) {
          expect(error.message).toEqual(ERROR_MESSAGE.noEmptyName);
          return;
        }

        if (name.length > MAX_CAR_NAME_LENGTH) {
          expect(error.message).toEqual(ERROR_MESSAGE.maxCarNameLength);
        }
      });
    }
  });
});
