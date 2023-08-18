import Cars from "../src/class/Cars";

describe("Cars Class 테스트", () => {
  test("addCar를 통해 이미 존재하는 자동차를 추가하면 에러가 발생한다.", () => {
    const carsModel = new Cars();

    carsModel.addCars(["test1", "test2"]);

    expect(() => carsModel.addCar("test1")).toThrowError(
      "자동차 이름은 중복될 수 없습니다.",
    );
  });

  test("addCars를 통해 이미 존재하는 자동차를 추가하면 에러가 발생한다.", () => {
    const carsModel = new Cars();

    carsModel.addCars(["test1", "test2"]);

    expect(() => carsModel.addCars(["test1", "test3"])).toThrowError(
      "자동차 이름은 중복될 수 없습니다.",
    );
  });

  test("getWinners를 통해 올바른 우승자가 출력된다.(1명)", () => {
    const cars = new Cars(["test1", "test2"]);

    cars.advanceCars((car) => car.name === "test1");

    expect(cars.winners).toEqual(["test1"]);
  });

  test("getWinners를 통해 올바른 우승자가 출력된다.(여러명)", () => {
    const cars = new Cars(["test1", "test2", "test3"]);

    cars.advanceCars((car) => car.name === "test1" || car.name === "test2");

    expect(cars.winners).toEqual(["test1", "test2"]);
  });
});
