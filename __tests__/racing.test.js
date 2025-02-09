import Car from "../src/Car";
import { racingGameGenerator } from "../src/racing";

describe("자동차 경주 테스트", () => {
  it("자동차 경주는 최대 5라운드로 진행된다.", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = racingGameGenerator(cars);

    let roundCount = 0;
    while (!racingGame.next().done) {
      roundCount++;
    }

    expect(roundCount).toBe(5);
  });

  test("라운드 1회당 모든 자동차 클래스의 moveForward 메서드를 1번씩 호출한다", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];
    const racingGame = racingGameGenerator(cars);

    const moveForwardSpys = cars.map((car) => jest.spyOn(car, "moveForward"));

    for (let round = 1; round <= 5; round++) {
      moveForwardSpys.forEach((spy) => spy.mockClear());
      racingGame.next();
      moveForwardSpys.forEach((spy) => expect(spy).toHaveBeenCalledTimes(1));
    }

    moveForwardSpys.forEach((spy) => spy.mockRestore());
  });
});
