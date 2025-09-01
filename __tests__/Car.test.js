import Car from "../src/Car";
import { playCarGame } from "../src/CarGame";

describe("자동차 클래스 테스트", () => {
  test("자동차는 이름을 상태로 가질 수 있다.", () => {
    const car = new Car({ name: "car1" });

    expect(car.name).toBe("car1");
  });

  test("자동차는 위치 값을 가진다", () => {
    const car = new Car({ name: "car2", position: 10 });

    expect(car.position).toBe(10);
  });

  test("자동차는 위치 값 초기 상태는 0이다.", () => {
    const car = new Car({ name: "car3" });

    expect(car.position).toBe(0);
  });

  test("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다. ", () => {
    const car = new Car({ name: "car4", position: 3 });

    car.moveForward();

    expect(car.position).toBe(4);
  });

  test("자동차는 두번 전진하면 2만큼 (한번에 1만큼씩 두번) 전진하게 된다 ", () => {
    const car = new Car({ name: "car5", position: 3 });

    car.moveForward();
    car.moveForward();

    expect(car.position).toBe(5);
  });
});

describe("자동차 경주 게임 테스트", () => {
  describe("자동차 이름을 입력할 때", () => {
    test("이름을 입력하면 전진하는 자동차를 출력할 때 자동차 이름과 자동차가 지나간 궤적이 출력된다. 자동차는 1회당 1칸씩 전진하며, 경주는 5회로 고정해서 진행된다.", async () => {
      const testInput = jest.fn().mockResolvedValue("car1");
      const testLogs = [];
      const testResultConsoleLog = (result) =>
        testLogs.push(String(result).trim());

      await playCarGame({
        askInput: testInput,
        resultConsoleLog: testResultConsoleLog,
      });

      expect(testLogs).toEqual([
        "실행 결과",
        "car1 : -",
        "car1 : --",
        "car1 : ---",
        "car1 : ----",
        "car1 : -----",
        "경주를 완료했습니다.",
      ]);
    });

    test("자동차 이름을 5자 초과로 입력할 경우 에러를 출력한다.", async () => {
      const testInput = jest.fn().mockResolvedValue("abcdef");
      const testLogs = [];
      const testResultConsoleLog = (result) =>
        testLogs.push(String(result).trim());

      await playCarGame({
        askInput: testInput,
        resultConsoleLog: testResultConsoleLog,
      });

      expect(testLogs).toEqual([]);
    });
  });
});

describe("자동차 경주 게임 테스트", () => {
  describe("자동차 이름을 입력할 때", () => {
    test("이름을 입력하면 전진하는 자동차를 출력할 때 자동차 이름과 궤적이 출력된다. 자동차는 1회당 1칸 전진, 경주는 5회 고정", async () => {
      const testInput = jest
        .fn()
        .mockResolvedValueOnce("car1")
        .mockResolvedValueOnce("5");
      const logs = [];
      const log = (s) => logs.push(String(s).trim());
      const fakeRandom = { random: () => 0.9 };

      await playCarGame({
        askInput: testInput,
        resultConsoleLog: log,
        random: fakeRandom,
        rounds: 5,
      });

      expect(logs).toEqual([
        "실행 결과",
        "car1 : -",
        "car1 : --",
        "car1 : ---",
        "car1 : ----",
        "car1 : -----",
        "경주를 완료했습니다.",
      ]);
    });
  });
});

