import { getRandomNumber } from "../src/utils/number.js";
import { displayForwardCar } from "../src/view.js";
import Car from "../src/domain/Car.js";
import { playGame } from "../src/controller.js";
import Race from "../src/domain/Race.js";

describe("자동차 경주 규칙 구현", () => {
  test("경주는 5회로 고정하여 진행한다.", () => {
    const race = playGame("pobi,crong,honux");

    expect(race.maxRound).toBe(5);
    expect(race.currentRound).toBe(5);
  });

  test("0~9 사이의 랜덤 값을 구한다.", () => {
    const randomNumber = getRandomNumber(0, 9);

    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(9);
  });

  test("자동차에 전달 된 숫자가 4이상인 경우에 자동차는 전진한다.", () => {
    const car = new Car("pobi");

    car.move(4);

    expect(car.position).toBe(1);
  });

  test("자동차에 전달 된 숫자가 4미만인 경우에 자동차는 정지한다.", () => {
    const car = new Car("pobi");

    car.move(3);

    expect(car.position).toBe(0);
  });
});

describe("자동차 경주 상황 출력 구현", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(global.console, "log");
  });

  afterEach(() => {
    logSpy.mockClear();
  });

  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const car = new Car("pobi");

    car.move(4);
    displayForwardCar(car);

    expect(logSpy).toHaveBeenCalledWith("pobi : -");
  });

  test("레이스에서 가장 많이 이동한 자동차가 우승자가 된다.", () => {
    const race = new Race(["pobi", "crong", "honux"]);
    race.cars[1].move(4);
    race.cars[1].move(4);

    expect(race.winners).toEqual([race.cars[1]]);
  });

  test("게임 완료 후 우승자를 출력한다.", () => {
    const race = playGame("pobi,crong,honux");

    const winners = race.winners;

    expect(logSpy).toHaveBeenCalledWith(
      `${winners.map((car) => car.name).join(", ")}가 최종 우승했습니다.`
    );
  });
});
