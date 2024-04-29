import {
  ERROR_CAR_NAME_TOO_LONG,
  ERROR_CAR_RACE_COUNT_NOT_VALID,
} from "../src/constants/error.js";
import Car from "../src/domain/Car.js";
import CarRace from "../src/domain/CarRace.js";
import {
  joinCarNamesByComma,
  printCarsStatus,
  createCars,
} from "../src/utils/cars.js";

describe("입출력 테스트", () => {
  test("진행할 자동차 경주의 총 횟수가 0 이상의 정수가 아니면 에러를 발생시킨다.", () => {
    // given
    const car1 = new Car("ganu");
    const car2 = new Car("sunu");
    const competitors = [car1, car2];
    const RACE_COUNT = -1;

    // when
    const createCarRace = () => {
      const carRace = new CarRace(competitors, RACE_COUNT);
    };

    // then
    expect(createCarRace).toThrow(ERROR_CAR_RACE_COUNT_NOT_VALID);
  });

  test("자동차 경주의 우승자를 출력할 때 우승자가 여러 명일 경우 쉼표(,)로 구분하여 출력한다.", () => {
    // given
    const car1 = new Car("pobi");
    const car2 = new Car("crong");
    const car3 = new Car("honux");
    const raceWinners = [car1, car2, car3];

    // when
    const joinedNames = joinCarNamesByComma(raceWinners);

    // then
    expect(joinedNames).toBe("pobi, crong, honux");
  });

  test("자동차의 현재 위치를 출력할 때 자동차의 위치 값(정수)는 '-'으로 출력된다.", () => {
    // given
    const car = new Car("ganbu");
    car.move();

    // when
    const carPositionToString = car.positionToString();

    // then
    expect(carPositionToString).toBe("-");
  });

  test("자동차 경주마다 각 자동차의 이름과 현재 위치를 같이 출력한다.", () => {
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

    logSpy.mockClear();
  });

  test("자동차 이름이 여러 개 입력되었을 때 한 개이상의 자동차 이름이 5글자 초과이면 프로그램을 종료한다.", () => {
    // given
    const USER_INPUT = "longerthan5,crong,honux";

    // when
    const createCarsFromInput = () => {
      const cars = createCars(USER_INPUT);
    };

    // then
    expect(createCarsFromInput).toThrow(ERROR_CAR_NAME_TOO_LONG);
  });
});
