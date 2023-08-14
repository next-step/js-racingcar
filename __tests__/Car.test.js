import Car, { CAR_NAME_MAX_LENGTH, CAR_NAME_MIN_LENGTH } from "../src/Car";
import { ERROR_MSG } from "../src/contants/error";

const DEFAULT_NAME = "jang";

describe("자동차", () => {
  test("자동차는 이름을 가질 수 있다.", () => {
    const car = new Car(DEFAULT_NAME);
    expect(car.getName()).toBe(DEFAULT_NAME);
  });

  test("자동차는 이름은 5자 이하만 가능하다.", () => {
    expect(() => {
      new Car("jangjang");
    }).toThrow(ERROR_MSG.MAX_LENGTH(CAR_NAME_MAX_LENGTH));
  });

  test("자동차 이름에 공백은 불가능하다.", () => {
    expect(() => {
      new Car("");
    }).toThrow(ERROR_MSG.MIN_LENGTH(CAR_NAME_MIN_LENGTH));
  });

  test("자동차 이름은 영어 문자열만 가능하다.", () => {
    expect(() => {
      new Car("123!");
    }).toThrow(ERROR_MSG.PATTERN);
  });

  test("자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.move(4);
    expect(car.getPosition()).toBe(1);
  });

  test("자동차는 랜덤 숫자가 4 미만이면 정지한다.", () => {
    const car = new Car(DEFAULT_NAME);
    car.move(2);
    expect(car.getPosition()).toBe(0);
  });
});
