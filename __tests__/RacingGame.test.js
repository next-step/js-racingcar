import RacingGame from "../src/RacingGame";
import { generateRandomNumber, compareNumber } from "../src/utils/number";
import { validateNames } from "../src/utils/validator";
import { toArray } from "../src/utils/string";
import { ERROR_CAR_NAME, NEWLINE } from "../src/contants/messages";
import {
  SEPARATOR,
  FORWARD_CONDITION,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  RANDOM_NUMBER_MAX,
  RANDOM_NUMBER_MIN,
} from "../src/contants/racingGame";

describe("경주할 자동차 입력", () => {
  test("자동차는 이름은 5자 이하만 가능하다.", () => {
    expect(() => {
      validateNames("jjjang");
    }).toThrow(ERROR_CAR_NAME.MAX_LENGTH(NAME_MAX_LENGTH));
  });

  test("자동차는 이름은 1자 이상만 가능합니다.", () => {
    expect(() => {
      validateNames("");
    }).toThrow(ERROR_CAR_NAME.MIN_LENGTH(NAME_MIN_LENGTH));
  });

  test("자동차 이름은 영어 문자열만 가능하다.", () => {
    expect(() => {
      validateNames("123!");
    }).toThrow(ERROR_CAR_NAME.PATTERN);
  });

  test("여러 자동차의 이름이 콤마로 구분해서 올 수 있다.", () => {
    const inputValue = "jang,kim";
    validateNames(inputValue);
    const racingGame = new RacingGame(inputValue);

    const names = toArray(inputValue, SEPARATOR);
    racingGame.cars.forEach((car, index) => {
      expect(car.name).toBe(names[index]);
    });
  });

  test("중복되는 이름은 허용하지 않는다.", () => {
    expect(() => {
      validateNames("jang,jang,kim");
    }).toThrow(ERROR_CAR_NAME.UINIQUE);
  });
});

describe("경주 시작", () => {
  describe("0에서 9 사이에서 무작위 값을 생성하여 부여한다.", () => {
    test("0에서 9 사이에서 무작위 값을 생성한다.", () => {
      const randomNumber = generateRandomNumber(
        RANDOM_NUMBER_MIN,
        RANDOM_NUMBER_MAX,
      );
      expect(randomNumber).toBeGreaterThanOrEqual(RANDOM_NUMBER_MIN);
      expect(randomNumber).toBeLessThanOrEqual(RANDOM_NUMBER_MAX);
    });

    test("자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.", () => {
      const targetNumber = 5;
      expect(compareNumber(targetNumber, FORWARD_CONDITION, ">=")).toBe(true);
    });

    test("자동차는 랜덤 숫자가 4 미만이면 정지한다.", () => {
      const targetNumber = 1;
      expect(compareNumber(targetNumber, FORWARD_CONDITION, ">=")).toBe(false);
    });
  });

  test("모든 자동차의 전진 현황을 출력할 수 있다.", () => {
    const inputValue = "jang,kim";
    validateNames(inputValue);
    const racingGame = new RacingGame(inputValue);

    const firstCar = racingGame.cars[0];
    firstCar.moveForward();

    expect(racingGame.getCarStatuses()).toBe(
      `jang : -${NEWLINE}kim : ${NEWLINE}`,
    );
  });
});

describe("경주 종료", () => {
  test("우승자를 출력한다.", () => {
    const inputValue = "jang,kim";
    validateNames(inputValue);
    const racingGame = new RacingGame(inputValue);

    const firstCar = racingGame.cars[0];
    firstCar.moveForward();
    expect(racingGame.getWinnerNames()).toBe("jang");
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
    const inputValue = "jang,kim,lee";
    validateNames(inputValue);
    const racingGame = new RacingGame(inputValue);

    const firstCar = racingGame.cars[0];
    firstCar.moveForward();
    const lastCar = racingGame.cars[2];
    lastCar.moveForward();
    expect(racingGame.getWinnerNames()).toBe("jang,lee");
  });
});
