import { Position } from "../../src/domain/Car.js";

describe("위치는", () => {
  let position;

  beforeEach(() => {
    position = new Position();
  });

  describe("=== 초기 위치 값에 대한 테스트 ===", () => {
    describe("> 생성할 때", () => {
      it("기본 위치가 0으로 초기화되어야 한다", () => {
        const initialPosition = 0;
        expect(position).toEqual(new Position(initialPosition));
      });

      it("음수 값을 전달받으면 에러를 던져야 한다", () => {
        expect(() => new Position(-1)).toThrow(
          Position.ERROR_MESSAGES.INVALID_POSITION,
        );
      });

      it("문자 값을 전달받으면 에러를 던져야 한다", () => {
        expect(() => new Position("1")).toThrow(
          Position.ERROR_MESSAGES.INVALID_POSITION,
        );
      });

      it("정수가 아닌 값을 전달받으면 에러를 던져야 한다", () => {
        expect(() => new Position(null)).toThrow(
          Position.ERROR_MESSAGES.INVALID_POSITION,
        );
      });
    });
  });

  describe("=== 위치 변경에 대한 테스트 ===", () => {
    describe("> 전진할 때", () => {
      it("위치가 1 증가해야 한다", () => {
        const initialPosition = position.value;
        position.moveForward();
        expect(position).toEqual(new Position(initialPosition + 1));
      });
    });
  });
});
