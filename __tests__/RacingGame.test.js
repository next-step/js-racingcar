import RacingGame, { SEPARATOR } from "../src/RacingGame";
import { generateRandomNumber } from "../src/utils/generator";
import { ERROR_MSG } from "../src/contants/messages";
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "../src/contants/racingGame";

describe("경주할 자동차 입력", () => {
  test("자동차는 이름은 5자 이하만 가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "jangjang";
    }).toThrow(ERROR_MSG.MAX_LENGTH(NAME_MAX_LENGTH));
  });

  test("자동차 이름에 공백은 불가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "";
    }).toThrow(ERROR_MSG.MIN_LENGTH(NAME_MIN_LENGTH));
  });

  test("자동차 이름은 영어 문자열만 가능하다.", () => {
    const racingGame = new RacingGame();
    expect(() => {
      racingGame.cars = "123!";
    }).toThrow(ERROR_MSG.PATTERN);
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
    }).toThrow(ERROR_MSG.UINIQUE);
  });
});

describe("경기 시작", () => {
  test("0에서 9 사이에서 무작위 값을 생성하여 부여한다.", () => {
    const condition = generateRandomNumber();
    expect(condition).toBeGreaterThanOrEqual(0);
    expect(condition).toBeLessThanOrEqual(9);
  });
});
