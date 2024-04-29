import { MOVE_THRESHOLD, TEST_CARS, TEST_DUPLICATED_CARS, TEST_NONEXISTENT_CARS } from "../src/constants";
import Car from "../src/domain/Car.js";
import Race from "../src/domain/Race.js";
import View from "../src/view/view.js";

/**
 * 
## 입출력
- [x] 쉼표를 기준으로 자동차 이름을 받는다.
- [x] 우승자가 여러명일 경우, 쉼표로 구분하여 출력한다.
- [x] 사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.
 */

describe("입출력 테스트", () => {
  test("쉼표를 기준으로 자동차 이름을 받는다.", async() => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_CARS.join(","));
    const input = await mockReadLineAsync();
    
    // when
    const carNames = input.split(",");
    
    // then
    carNames.forEach((car, index) => {
      expect(car).toBe(TEST_CARS[index]);
    });
  });

  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", async() => {
    // given
    const logSpy = jest.spyOn(console, "log");
    const car = new Car("car1");

    // when
    car.moveForward(MOVE_THRESHOLD);
    View.printRaceProgress(car.name, car.position);
    
    // then
    expect(logSpy).toHaveBeenCalledWith("car1: -");
  });

  test("우승자가 여러명일 경우, 쉼표로 구분하여 출력한다.", async() => {
    // given
    const logSpy = jest.spyOn(console, "log");
    const positionedCars = TEST_CARS.map(car => new Car(car));
    positionedCars.forEach(car => car.moveForward(MOVE_THRESHOLD));
    const race = new Race(positionedCars);

    // when
    View.printWinners(race.winners);
    
    // then
    expect(logSpy).toHaveBeenCalledWith(TEST_CARS.join(", ") + "가 최종 우승했습니다.");
  });

  test("자동차가 존재하지 않을 경우, 프로그램을 종료한다.", async() => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_NONEXISTENT_CARS.join(","));
    const input = await mockReadLineAsync();

    // when
    const validateionCallback = () => View.validates(input);
    
    // then
    expect(validateionCallback).toThrowError("자동차가 존재하지 않습니다.");
  });

  test("동일한 자동차가 존재할 경우, 프로그램을 종료한다.", async() => {
    // given
    const mockReadLineAsync = jest.fn().mockResolvedValue(TEST_DUPLICATED_CARS.join(","));
    const input = await mockReadLineAsync();

    // when
    const validateionCallback = () => View.validates(input);
    
    // then
    expect(validateionCallback).toThrowError("중복된 자동차가 존재합니다.");
  });
})