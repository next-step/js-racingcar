import { CAR } from "../src/constants/error";
import { generateCars } from "../src/domain/generateCars";

describe("자동차 생성", () => {
  test("자동차의 이름이 빈 문자열일 경우 에러를 던진다", () => {
    const inputCarName = "";

    expect(() => generateCars(inputCarName)).toThrow(CAR.NAME_EMPTY);
  });
  test("한개의 자동차의 이름이 주어졌을 때, 자동차 한개가 생성된다.", () => {
    const inputCarName = "navy";
    const cars = generateCars(inputCarName);
    expect(cars.length).toBe(1);
  });

  test("두개 이상의 자동차 이름이 주어졌을 때, 자동차 갯수에 맞게 생성된다.", () => {
    const inputCarName = "navy,white,gray";
    const cars = generateCars(inputCarName);
    expect(cars.length).toBe(3);
  });
});
