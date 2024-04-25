import { Position } from "../../src/domain/position.js";

describe("객체 생성", () => {
  it("생성", () => {
    const position = new Position();
    expect(position).toEqual(new Position());
  });

  it("음수로 생성 불가", () => {
    expect(() => new Position(-1)).toThrow("0보다 작을 수 없습니다.");
  });
});
