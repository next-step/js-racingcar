import Car from "../src/domain/Car";
import {
  joinNamesByComma,
  printCarsStatus,
  splitNamesByComma,
} from "../src/utils/IO";

describe("입출력 테스트", () => {
  test("자동차의 이름은 쉼표(,)를 기준으로 구분", () => {
    // given
    const CAR_NAMES = "pobi,crong,honux";

    // when
    const splittedNames = splitNamesByComma(CAR_NAMES);

    // then
    expect(splittedNames).toEqual(["pobi", "crong", "honux"]);
  });

  test("우승자가 여러 명일 겨우 쉼표(,)를 이용하여 구분", () => {
    // given
    const RACE_WINNERS = ["pobi", "crong", "honux"];

    // when
    const joinedNames = joinNamesByComma(RACE_WINNERS);

    // then
    expect(joinedNames).toBe("pobi, crong, honux");
  });

  test("자동차의 현재 위치를 '-' 으로 표현", () => {
    // given
    const car = new Car("ganbu");
    car.move();

    // when
    const carPositionToString = car.positionToString();

    // then
    expect(carPositionToString).toBe("-");
  });

  test("전진하는 자동차를 출력할 때 자동차의 이름과 위치를 같이 출력", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("toto");
    const cars = [car1, car2];

    car1.move();
    car2.move();

    const logSpy = jest.spyOn(console, "log").mockImplementation();

    // when
    printCarsStatus(cars);

    // then
    expect(logSpy).toHaveBeenCalledWith("ganu : -");
    expect(logSpy).toHaveBeenCalledWith("toto : -");

    console.log.mockClear();
  });
});
