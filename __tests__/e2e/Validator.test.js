import { App } from "../../src";
import { CAR } from "../../src/constants/car";
import { ERROR_MESSAGES } from "../../src/constants/messages";
import { input } from "../../src/view/input";

jest.mock("../../src/view/input", () => {
  return {
    input: {
      carName: jest.fn(),
    },
  };
});

describe("자동차 이름 유효성 e2e 테스트", () => {
  let logSpy;
  let app;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
    app = new App();
  });

  test(`자동차 이름은 ${CAR.NAME_MAX_LENGTH}자 이하만 입력 가능하다.`, async () => {
    await input.carName.mockReturnValue("123456,1234,123");

    await app.init();

    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGES.CAR_NAME_LENGTH);
  });

  test(`자동차 이름은 ${CAR.NAME_MIN_LENGTH}자 이상만 입력 가능하다.`, async () => {
    await input.carName.mockReturnValue(",a,b");

    await app.init();

    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGES.CAR_NAME_LENGTH);
  });

  test("중복된 자동차 이름이 존재할 수 없다.", async () => {
    await input.carName.mockReturnValue("a, a, b");

    await app.init();

    expect(logSpy).toHaveBeenCalledWith(ERROR_MESSAGES.SAME_CAR_NAME);
  });
});
