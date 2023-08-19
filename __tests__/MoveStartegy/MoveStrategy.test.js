import MoveStrategy from "../../src/Models/MoveStrategy";
import {
  MoveStrategyIsAbstractClassError,
  GenerateNumberNotImplementedError,
  IsMovableNotImplementedError,
  ConditionFunctionNotFunctionError,
} from "../../src/Models/MoveStrategy/errors";
import EmptyStrategy from "../../test/EmptyStrategy";

describe("MoveStrategy 추상 클래스 테스트", () => {
  it("new MoveStrategy()로 인스턴스를 생성하면 에러가 발생합니다.", () => {
    expect(() => new MoveStrategy()).toThrow(MoveStrategyIsAbstractClassError);
  });

  const notImplementedStrategy = new EmptyStrategy();
  it("getNumber() 메소드를 자식 클래스에서 구현하지 않고 호출하면, 에러가 발생합니다.", () => {
    expect(() => notImplementedStrategy.generateNumber()).toThrow(
      GenerateNumberNotImplementedError
    );
  });

  it("isMovable() 메소드를 자식 클래스에서 구현하지 않고 호출하면, 에러가 발생합니다.", () => {
    expect(() => notImplementedStrategy.isMovable()).toThrow(
      IsMovableNotImplementedError
    );
  });
});

describe("MovableCondition 조회, 변경 테스트", () => {
  const childStrategy = new EmptyStrategy();

  describe("conditionFunc 유효성 검사 테스트", () => {
    describe("- 함수가 아니면, 에러가 발생합니다.", () => {
      it.each([1031, true, "erica", null, undefined, {}, []])(
        "%p",
        (conditionFunc) => {
          expect(() =>
            childStrategy.setMovableCondition(conditionFunc)
          ).toThrow(ConditionFunctionNotFunctionError);
        }
      );
    });

    describe("- 유효한 형태라면, 에러가 발생하지 않습니다.", () => {
      it.each([
        { conditionFunc: function () {}, code: "function () {}" },
        {
          conditionFunc: (number) => number >= 5,
          code: "(number) => number >= 5",
        },
        {
          conditionFunc: new Function(),
          code: "new Function()",
        },
      ])("$code", ({ conditionFunc }) => {
        expect(() =>
          childStrategy.setMovableCondition(conditionFunc)
        ).not.toThrow();
      });
    });
  });

  describe("getMovableCondition() 테스트", () => {
    describe("- #movableCondition을 반환한다.", () => {
      it.each([
        { conditionFunc: function () {}, code: "function () {}" },
        {
          conditionFunc: (number) => number >= 5,
          code: "(number) => number >= 5",
        },
        {
          conditionFunc: new Function(),
          code: "new Function()",
        },
      ])("$code", ({ conditionFunc }) => {
        childStrategy.setMovableCondition(conditionFunc);
        expect(childStrategy.getMovableCondition()).toBe(conditionFunc);
      });
    });
  });
});
