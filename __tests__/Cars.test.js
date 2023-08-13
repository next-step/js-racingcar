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

  test("0~9 이외의 문자가 포함된 이동횟수 입력시 에러가 발생한다.", () => {
    const carsModel = new Cars();

    const testRoundNumber = "-0.1";

    expect(() => carsModel.setRoundNumber(testRoundNumber)).toThrowError(
      "양의 정수 형식의 값을 입력해 주세요.",
    );
  });

  test("0이하의 숫자가 입력된 경우 에러가 발생한다", () => {
    const carsModel = new Cars();

    const testRoundNumber = "0";

    expect(() => carsModel.setRoundNumber(testRoundNumber)).toThrowError(
      "1이상 값을 입력해주세요.",
    );
  });

  test("setRoundNumber로 roundNumber가 갱신되며 지정한 횟수만큼 라운드가 진행된다.", () => {
    const testRoundNumber = 3;

    const carsModel = new Cars();

    carsModel.setRoundNumber(testRoundNumber);

    const executeMultipleRoundsSpy = jest.spyOn(
      carsModel,
      "executeMultipleRounds",
    );

    let afterRoundActionCallCount = 0;
    const afterRoundAction = () => {
      afterRoundActionCallCount++;
    };

    const executeOneRoundSpy = jest.spyOn(carsModel, "executeOneRound");

    carsModel.executeMultipleRounds(afterRoundAction);

    expect(executeMultipleRoundsSpy).toHaveBeenCalledTimes(1);

    expect(afterRoundActionCallCount).toBe(testRoundNumber);

    expect(executeOneRoundSpy).toHaveBeenCalledTimes(testRoundNumber);
  });

  test("getWinners를 통해 올바른 우승자가 출력된다", () => {
    const mockAdvanceCondition = (name) => {
      return name === "test1";
    };

    const carsModel = new Cars([mockAdvanceCondition]);

    carsModel.addCars(["test1", "test2"]);

    carsModel.setRoundNumber(1);

    carsModel.executeMultipleRounds();

    expect(carsModel.getWinners()).toEqual(["test1"]);
  });
});
