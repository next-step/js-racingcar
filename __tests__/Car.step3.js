import { validateMaxLength } from "../src/controller/validator";
import { ERROR_MESSAGE } from "../src/constants/ErrorMessage";

import {
  validateDuplicationItemList,
  validateEmptyString,
} from "../src/validator";

describe("RacingCarGameController 사용자가 입력하는 데이터", () => {
  const duplicateNameList = ["frank", "frank"];
  const invalidNameList = ["", "123456", "frank", "frank"];

  test("validationDuplicationItemList 메서드에 중복된 값이 있는 리스트를 전달하면, duplicateCarName 에러를 throw한다. ", () => {
    expect(() => validateDuplicationItemList(duplicateNameList)).toThrow(
      ERROR_MESSAGE.duplicateName
    );
  });

  test("validateEmptyString 메서드에 빈 값이 있는 리스트를 전달하면, noEmptyName 에러가 포함됐는지 확인한다.", () => {
    const capturedErrors = [];

    invalidNameList.forEach(name => {
      try {
        validateEmptyString(name);
      } catch (error) {
        capturedErrors.push(error.message);
      }
    });

    expect(capturedErrors.includes(ERROR_MESSAGE.noEmptyName)).toBe(true);
  });

  // ** Received function did not throw. 리스트 중 하나라도 오류가 있으면 error를 특정 메세지를 toThrow 보여주고 싶습니다. 더 나은 방법이나 힌트 및 키워드를 알려주시면 찾아보고 싶습니다.
  test("validateMaxLength 메서드에 MAX_CAR_NAME_LENGTH를 넘는 리스트를 전달하면, 컨트롤러 maxCarNameLength 에러를 throw 한다.", () => {
    invalidNameList.forEach(name => {
      expect(() => {
        validateMaxLength(name);
      }).toThrow(ERROR_MESSAGE.maxCarNameLength);
    });
  });
});
