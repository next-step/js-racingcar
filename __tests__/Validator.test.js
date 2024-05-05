import { CAR } from "../src/constants/car";
import { CAR_RACE } from "../src/constants/carRace";
import { ERROR_MESSAGES } from "../src/constants/messages";
import { car } from "../src/validator/car";
import { carRace } from "../src/validator/carRace";

describe("자동차 이름 유효성 테스트", () => {
  test(`자동차 이름은 ${CAR.NAME_MAX_LENGTH}자 이하만 입력 가능하다.`, () => {
    const carInput = ["a".repeat(CAR.NAME_MAX_LENGTH + 1)];

    expect(() => car.nameValidator(carInput)).toThrow(
      ERROR_MESSAGES.CAR_NAME_LENGTH,
    );
  });

  test(`자동차 이름은 ${CAR.NAME_MIN_LENGTH}자 이상만 입력 가능하다.`, () => {
    const carInput = [
      CAR.NAME_MIN_LENGTH - 1 <= 0 ? "" : "a".repeat(CAR.NAME_MIN_LENGTH - 1),
    ];

    expect(() => car.nameValidator(carInput)).toThrow(
      ERROR_MESSAGES.CAR_NAME_LENGTH,
    );
  });

  test("중복된 자동차 이름이 존재할 수 없다.", () => {
    const carInput = ["a", "a", "b"];

    expect(() => {
      car.nameValidator(carInput);
    }).toThrow(ERROR_MESSAGES.SAME_CAR_NAME);
  });
});

describe("시도 횟수 유효성 테스트", () => {
  test(`시도 횟수가 ${CAR_RACE.MIN_ROUND_COUNT}미만이면 에러 메시지를 띄운다.`, () => {
    const tryCount = CAR_RACE.MIN_ROUND_COUNT - 1;

    expect(() => {
      carRace.tryCountValidator(tryCount);
    }).toThrow(ERROR_MESSAGES.TRY_COUNT_MIN);
  });

  test("시도 횟수가 정수가 아니면 에러 메시지를 띄운다.", () => {
    const tryCount1 = "a";
    const tryCount2 = 1.1;

    expect(() => {
      carRace.tryCountValidator(tryCount1);
    }).toThrow(ERROR_MESSAGES.TRY_COUNT_NUMBER);
    expect(() => {
      carRace.tryCountValidator(tryCount2);
    }).toThrow(ERROR_MESSAGES.TRY_COUNT_NUMBER);
  });
});
