import RacingGame, { SEPARATOR } from "../src/RacingGame";
import { generateRandomNumber } from "../src/utils/generator";
import { compareNumber } from "../src/utils/compare";
import { ERROR_CAR_NAME, NEWLINE } from "../src/contants/messages";
import {
  FORWARD_CONDITION,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  RANDOM_NUMBER_MAX,
  RANDOM_NUMBER_MIN,
} from "../src/contants/racingGame";

describe("경주할 자동차 입력", () => {
  test("자동차는 이름은 5자 이하만 가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "jjjang";
    }).toThrow(ERROR_CAR_NAME.MAX_LENGTH(NAME_MAX_LENGTH));
  });

  test("자동차 이름에 공백은 불가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "";
    }).toThrow(ERROR_CAR_NAME.MIN_LENGTH(NAME_MIN_LENGTH));
  });

  test("자동차 이름은 영어 문자열만 가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "123!";
    }).toThrow(ERROR_CAR_NAME.PATTERN);
  });

  test("여러 자동차의 이름이 콤마로 구분해서 올 수 있다.", () => {
    const cars = ["jang", "kim"];
    const carsStr = cars.join(SEPARATOR);

    const racingGame = new RacingGame();
    racingGame.cars = carsStr;
    racingGame.cars.forEach((car, index) => {
      expect(car.name).toBe(cars[index]);
    });
  });

  test("중복되는 이름은 허용하지 않는다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "jang,jang,kim";
    }).toThrow(ERROR_CAR_NAME.UINIQUE);
  });
});

describe("경기 시작", () => {
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
    const racingGame = new RacingGame();
    racingGame.cars = "jang,kim";
    const firstCar = racingGame.cars[0];
    firstCar.moveForward();
    expect(racingGame.getCarStatuses()).toBe(
      `jang : -${NEWLINE}kim : ${NEWLINE}`,
    );
  });
});
