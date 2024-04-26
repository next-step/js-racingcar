import { ERROR_MESSAGES } from "../src/constants/messages";
import { car } from "../src/validator/car";

describe("자동차 이름 유효성 테스트", () => {
  test("자동차의 이름은 5자 이하만 입력 가능하다.", () => {
    const carInput = ["123456", "123", "1234"];

    expect(() =>
      car.nameLengthValidator(carInput).toThrow(ERROR_MESSAGES.CAR_NAME_LENGTH)
    );
  });
});
