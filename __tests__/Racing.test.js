import Car from "../src/domain/car/car.model.js";
import Racing from "../src/domain/racing/racing.model.js";

describe("자동차 경주", () => {
  function movementRule() {
    return true;
  }

  test("자동차 경주의 라운드는 number 타입이 아닐 경우 에러가 발생한다.", () => {
    // Arrange
    const cars = [new Car({ name: "Tesla" }), new Car({ name: "BMW" })];
    const totalRounds = "3";

    // Act & Assert
    expect(
      () =>
        new Racing({
          cars,
          totalRounds,
          movementRule,
        }),
    ).toThrow(TypeError);
  });

  test("자동차 경주는 N회 만큼 진행한다.", () => {
    // Arrange
    const cars = [new Car({ name: "Tesla" }), new Car({ name: "BMW" })];
    const totalRounds = 3;
    const racing = new Racing({
      cars,
      totalRounds,
      movementRule: movementRule,
    });

    // Act
    racing.start();

    // Assert
    expect(racing.round).toBe(3);
  });

  test("자동차 경주가 종료되면 우승자를 선정한다.", () => {
    // Arrange
    const cars = [
      new Car({ name: "Tesla", position: 5 }),
      new Car({ name: "BMW", position: 3 }),
      new Car({ name: "Audi", position: 5 }),
    ];

    const racing = new Racing({ cars, movementRule });

    // Act
    racing.start();
    // Assert
    const winnerNames = racing.winners.map((car) => car.name);
    expect(winnerNames).toStrictEqual(["Tesla", "Audi"]);
  });
});
