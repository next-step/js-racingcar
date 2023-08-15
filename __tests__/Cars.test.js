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

  test("0~9 이외의 문자가 포함된 라운드를 입력시 에러가 발생한다.", () => {
    const carsModel = new Cars();

    const testRoundNumber = "-0.1";

    expect(() => {
      carsModel.roundNumber = testRoundNumber;
    }).toThrowError("양의 정수 형식의 값을 입력해 주세요.");
  });

  test("0을 입력시 에러가 발생한다", () => {
    const carsModel = new Cars();

    const testRoundNumber = "0";

    expect(() => {
      carsModel.roundNumber = testRoundNumber;
    }).toThrowError("1이상 값을 입력해주세요.");
  });

  test("setRoundNumber로 roundNumber가 갱신되며 지정한 횟수만큼 라운드가 진행된다.", () => {
    const testRoundNumber = 3;

    const carsModel = new Cars();

    carsModel.roundNumber = testRoundNumber;

    let afterRoundActionCallCount = 0;
    const afterRoundAction = () => {
      afterRoundActionCallCount += 1;
    };

    let executeOneRoundCount = 0;
    const originalExecuteOneRound = carsModel.executeOneRound;

    carsModel.executeOneRound = function (...args) {
      executeOneRoundCount += 1;
      return originalExecuteOneRound.apply(this, args);
    };

    let executeMultipleRoundCount = 0;
    const originalExecuteMultipleRound = carsModel.executeMultipleRounds;

    carsModel.executeMultipleRounds = function (...args) {
      executeMultipleRoundCount += 1;

      return originalExecuteMultipleRound.apply(this, args);
    };

    carsModel.executeMultipleRounds(afterRoundAction);

    expect(executeMultipleRoundCount).toBe(1);

    expect(afterRoundActionCallCount).toBe(testRoundNumber);

    expect(executeOneRoundCount).toBe(testRoundNumber);
  });

  test("getWinners를 통해 올바른 우승자가 출력된다.(1명)", () => {
    const mockAdvanceCondition = (name) => {
      return name === "test1";
    };

    const carsModel = new Cars(["test1", "test2"]);

    carsModel.roundNumber = 1;

    carsModel.executeMultipleRounds(() => {}, [mockAdvanceCondition]);

    expect(carsModel.winners).toEqual(["test1"]);
  });

  test("getWinners를 통해 올바른 우승자가 출력된다.(여러명)", () => {
    const mockAdvanceCondition = (name) => {
      return name === "test1" || name === "test2";
    };

    const carsModel = new Cars(["test1", "test2", "test3"]);

    carsModel.roundNumber = 1;

    carsModel.executeMultipleRounds(() => {}, [mockAdvanceCondition]);

    expect(carsModel.winners).toEqual(["test1", "test2"]);
  });
});
