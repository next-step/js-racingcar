import { findFarthestCar, tryDriveCar } from "../src/domain/race";
import Car from "../src/domain/car";

describe("사용자가 입력한 차들이 레이싱을 할때", () => {
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

  test("차들이 전달 받은 값이 4 이상일때만 전진한다.", () => {
    tryDriveCar(firstCar, 4);
    expect(firstCar.state).toBe(1);

    tryDriveCar(firstCar, 2);
    expect(firstCar.state).toBe(1);
  });
});
