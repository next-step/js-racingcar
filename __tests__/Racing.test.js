import { Car } from "../src/domain/car/car.model.js";
import { Racing } from "../src/domain/racing/racing.model.js";

describe("자동차 경주", () => {
  test("자동차 경주는 5회로 고정하여 진행한다.", () => {
    // Arrange
    const carList = [new Car({ name: "Tesla" }), new Car({ name: "BMW" })];
    function movementRule() {
      return true;
    }
    const racing = new Racing({ carList: carList, movementRule: movementRule });

    // Act
    racing.start();

    // Assert
    expect(racing.round).toBe(5);
  });

  test("자동차 경주가 종료되면 우승자를 선정한다.", () => {
    // Arrange
    const carList = [
      new Car({ name: "Tesla", position: 5 }),
      new Car({ name: "BMW", position: 3 }),
      new Car({ name: "Audi", position: 5 }),
    ];
    function movementRule() {
      return true;
    }
    const racing = new Racing({ carList: carList, movementRule: movementRule });

    // Act
    racing.start();

    // Assert
    const winnerList = racing.winnerList.map((car) => car.name);
    expect(winnerList).toStrictEqual(["Tesla", "Audi"]);
  });
});
