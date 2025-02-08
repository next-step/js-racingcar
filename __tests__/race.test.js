import { findFarthestCar } from "../src/race";
import Car from "../src/car";

describe("가장 멀리간 차를 찾는다", () => {
  let firstCar;
  let secondCar;
  let thirdCar;

  beforeEach(() => {
    firstCar = new Car("일번차");
    secondCar = new Car("이번차");
    thirdCar = new Car("삼번차");
  });

  test("가장 멀리간 차를 찾는다", () => {
    firstCar.go();
    firstCar.go();
    firstCar.go();

    secondCar.go();
    secondCar.go();

    thirdCar.go();

    expect(findFarthestCar([firstCar, secondCar, thirdCar])).toBe("일번차");
  });

  test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
    firstCar.go();
    firstCar.go();

    secondCar.go();
    secondCar.go();

    thirdCar.go();

    expect(findFarthestCar([firstCar, secondCar, thirdCar])).toBe(
      "일번차,이번차"
    );
  });
});
