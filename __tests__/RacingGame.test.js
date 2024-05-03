import Car from "../src/domain/Car.js";
import { getWinners } from "../src/domain/RacingGame";

describe("자동차 경주 게임 기능 테스트", () => {
  test("가장 멀리 간 자동차의 이름을 반환한다.", () => {
    // given
    let cars = [];
    const carA = new Car("정민지"); // winner
    const carB = new Car("강보경");

    // when
    carA.move(6);
    carB.move(1);

    cars.push(carA);
    cars.push(carB);

    const winners = getWinners(cars);

    // then
    expect(winners[0].name).toBe("정민지");
  });
});
