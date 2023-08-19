import MoveStrategies from "../../test/MoveStrategies";
import {
  StrategiesNotStringError,
  StrategyElementNotRorNumericError,
} from "../../test/errors";
import FixedStrategy from "../../test/FixedStrategy";
import RandomStrategy from "../../src/Models/MoveStrategy/RandomStrategy";

describe("생성자 테스트", () => {
  describe("str 유효성 검사 테스트", () => {
    describe("str이 문자열이 아니면, 에러를 발생시킨다.", () => {
      it.each([123, true, null, undefined, {}, [], function () {}])(
        "%p",
        (str) => {
          expect(() => new MoveStrategies(str)).toThrow(
            StrategiesNotStringError
          );
        }
      );
    });

    describe("str의 문자가 R이나 숫자가 아니면, 에러를 발생시킨다.", () => {
      it.each(["a", "bR", "RRR1*", "123_", "123Rr", "   "])("%p", (str) => {
        expect(() => new MoveStrategies(str)).toThrow(
          StrategyElementNotRorNumericError
        );
      });
    });

    describe("유효한 경우, 에러를 발생시키지 않는다.", () => {
      it.each(["R", "RR", "123", "0000", "R123R"])("%p", (str) => {
        expect(() => new MoveStrategies(str)).not.toThrow();
      });
    });
  });

  describe("생성자 내부 로직, 반환값 테스트", () => {
    describe("문자가 R이면 RandomStrategy, 숫자면 FixedStrategy를 생성해 배열 형태로 반환한다.", () => {
      it.each([
        { str: "R", expected: [new RandomStrategy()] },
        { str: "1", expected: [new FixedStrategy(1)] },
        { str: "R1", expected: [new RandomStrategy(), new FixedStrategy(1)] },
        {
          str: "R1R",
          expected: [
            new RandomStrategy(),
            new FixedStrategy(1),
            new RandomStrategy(),
          ],
        },
        {
          str: "R1R1",
          expected: [
            new RandomStrategy(),
            new FixedStrategy(1),
            new RandomStrategy(),
            new FixedStrategy(1),
          ],
        },
      ])("str: $str", ({ str, expected }) => {
        const moveStrategies = new MoveStrategies(str);
        expect(moveStrategies).toEqual(expected);
      });
    });
  });
});
