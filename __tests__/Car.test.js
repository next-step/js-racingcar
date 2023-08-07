import Validator from "../src/class/Validator";
import Cars from "../src/class/Cars";
import Car from "../src/class/Car";

describe("Validator Class 테스트", () => {
  describe("validateCarNames 테스트", () => {
    test("자동차 이름 중 빈값인 자동차가 포함되면 에러가 발생한다.", () => {
      expect(() => Validator.validateCarNames(["", "테스트"])).toThrowError(
        "자동차 이름은 빈값일 수 없습니다.",
      );
    });

    test("자동차 이름 중 6자 이상인 자동차가 있으면 에러가 발생한다.", async () => {
      expect(() =>
        Validator.validateCarNames(["테스트", "123456"]),
      ).toThrowError("자동차 이름은 5자를 넘길 수 없습니다.");
    });

    test("자동차 이름 중 같은 이름의 자동차가 있으면 에러가 발생한다.", async () => {
      expect(() =>
        Validator.validateCarNames(["테스트", "테스트"]),
      ).toThrowError("자동차 이름은 중복될 수 없습니다.");
    });
  });

  describe("validateRoundNumber 테스트", () => {
    test("0~9 이외의 문자가 포함된 이동횟수 입력시 에러가 발생한다.", () => {
      const testRoundNumber = "-0.1";

      expect(() => Validator.validateRoundNumber(testRoundNumber)).toThrowError(
        "양의 정수 형식의 값을 입력해 주세요.",
      );
    });

    test("0이하의 숫자가 입력된 경우 에러가 발생한다", () => {
      const testRoundNumber = "0";

      expect(() => Validator.validateRoundNumber(testRoundNumber)).toThrowError(
        "1이상 값을 입력해주세요.",
      );
    });
  });
});

describe("Car Class 테스트", () => {
  test("advanceCondition이 true를 반환하면 distance가 1 증가한다.", async () => {
    const mockAdvanceCondition = () => true;

    const car = new Car("test Car", mockAdvanceCondition);

    car.advance();

    expect(car.getDistance()).toBe(1);
  });
});

describe("Cars Class 테스트", () => {
  test("setRoundNumber로 roundNumber가 갱신되며 지정한 횟수만큼 라운드가 진행된다.", async () => {
    const testRoundNumber = 3;

    const carsModel = new Cars();

    carsModel.setRoundNumber(testRoundNumber);

    const executeMultipleRoundsSpy = jest.spyOn(
      carsModel,
      "executeMultipleRounds",
    );

    const afterRoundActionSpy = jest.fn();

    const executeOneRoundSpy = jest.spyOn(carsModel, "executeOneRound");

    carsModel.executeMultipleRounds(afterRoundActionSpy);

    expect(executeMultipleRoundsSpy).toHaveBeenCalledTimes(1);

    expect(afterRoundActionSpy).toHaveBeenCalledTimes(testRoundNumber);

    expect(executeOneRoundSpy).toHaveBeenCalledTimes(testRoundNumber);
  });
});
