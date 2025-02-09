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

  test("라운드 1회당 자동차는 1칸씩 전진한다", () => {
    const cars = [new Car("벤츠"), new Car("BMW"), new Car("아우디")];

    const racingGame = racingGameGenerator(cars);

    cars.forEach((car) => expect(car.position).toBe(0));

    for (let position = 1; position <= 5; position++) {
      const result = racingGame.next().value;
      result.forEach((car) => expect(car.position).toBe(position));
    }
  });
});
