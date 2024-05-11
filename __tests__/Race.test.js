import { Race } from "../src/domain/race/Race";

describe("레이스 클래스 테스트", () => {
  test("생성 테스트", () => {
    const carNames = "BMW,Kia,Benz";
    const race = new Race(carNames);

    expect(race.getNumberOfCars()).toBe(3);
  });
});
