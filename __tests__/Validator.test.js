import { ERROR_MESSAGES } from "../src/constants/messages";
import { car } from "../src/validator/car";

describe("자동차 이름 유효성 테스트", () => {
  test("자동차의 이름은 5자 이하만 입력 가능하다.", () => {
    const carInput = ["123456", "123", "1234"];

    expect(() =>
      car
        .nameMaxLengthValidator(carInput)
        .toThrow(ERROR_MESSAGES.CAR_MAX_NAME_LENGTH)
    );
  });
  test("자동차의 이름은 1자 이상만 입력 가능하다.", () => {
    const carInput = ["", "", "asda"];

    expect(() =>
      car
        .nameMinLengthValidator(carInput)
        .toThrow(ERROR_MESSAGES.CAR_MIN_NAME_LENGTH)
    );
  });
  test("중복되게 자동차의 이름을 입력할 수 없다.", () => {
    const carInput = ["a", "a", "b"];

    expect(() => {
      car.sameNameValidator(carInput).toThrow(ERROR_MESSAGES.SAME_CAR_NAME);
    });
  });
});
