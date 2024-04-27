import { playGame } from "../src/Controller.js";
import Car from "../src/domain/Car.js";
import { getRandomNumber } from "../src/utils/utils.js";
import { displayForwardCar } from "../src/View.js";

describe("자동차 구현 테스트", () => {
  test("자동차에 이름을 부여할 수 있다.", () => {
    const car = new Car("pobi");
    expect(car.name).toBe("pobi");
  });

  test("자동차 이름이 5자 초과인 경우 에러를 발생시킨다.", () => {
    const carNameOver5 = "saemileee";
    expect(() => new Car(carNameOver5)).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });
});

describe("자동차 이름 입력 구현 테스트", () => {
  test("자동차 이름은 쉼표를 기준으로 구분한다.", () => {
    const race = new playGame("pobi,crong,honux");

    const raceCars = race.cars;

    expect(raceCars[0].name).toBe("pobi");
    expect(raceCars[1].name).toBe("crong");
    expect(raceCars[2].name).toBe("honux");
  });

  test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
    const wrongInput = "pobi, crong, honux123";

    expect(() => new playGame(wrongInput)).toThrow(Error);
  });
});

describe("자동차 경주 규칙 구현", () => {
  test("경주는 5회로 고정하여 진행한다.", () => {
    const race = new playGame("pobi,crong,honux");

    expect(race.maxRound).toBe(5);
    expect(race.currentRound).toBe(5);
  });

  test("0~9 사이의 랜덤 값을 구한다.", () => {
    const randomNumber = getRandomNumber(0, 9);

    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(9);
  });

  test("0~9 사이의 랜덤 값을 구한 후 값이 4 이상인 경우 전진한다.", () => {
    const randomNumber = getRandomNumber(0, 9);

    const car = new Car("pobi");
    car.move(randomNumber);

    if (randomNumber >= 4) {
      expect(car.position).toBe(1);
    } else {
      expect(car.position).toBe(0);
    }
  });
});

describe("자동차 경주 상황 출력 구현", () => {
  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const logSpy = jest.spyOn(global.console, "log");
    const car = new Car("pobi");

    car.moveForward();
    displayForwardCar(car);

    expect(logSpy).toHaveBeenCalledWith("pobi : -");
  });
});
