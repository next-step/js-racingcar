import Car from "../src/domain/Car";
import { getWinnerCars } from "../src/domain/getWinnerCars.js";

describe("승리자 찾기", () => {
  test("자동차를 받아서 승리자를 확인한다", () => {
    const cars = [new Car("nj", 4), new Car("woody", 6)];
    const winner = getWinnerCars(cars);

    expect(winner[0].name).toEqual("woody");
  });
  test("두명 이상의 승리자가 있을 때, 두명 이상이 우승한다", () => {
    const cars = [new Car("summ", 4), new Car("woody", 6), new Car("mini", 6)];
    const winner = getWinnerCars(cars);

    expect(winner.length).toBe(2);
  });
});
