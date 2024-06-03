import { Racing } from "../src/domain/Racing";
import { generateCars } from "../src/domain/generateCars";

describe("자동차 경주 테스트", () => {
  test("입력된 자동차 경주 횟수만큼 자동차 경주가 시작된다", () => {
    const cars = generateCars("navy,red,black");
    const racer = new Racing(cars, 5);

    const histories = racer.gameStart();
    expect(histories.length).toBe(5);
    expect(racer.cars.length).toBe(3);
  });
});
