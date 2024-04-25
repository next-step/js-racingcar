import { Position } from "../../src/domain/position.js";

describe("객체 생성", () => {
  it("생성", () => {
    const position = new Position();
    expect(position.value).toEqual(0);
  });

  it("음수로 생성 불가", () => {
    expect(() => new Position(-1)).toThrow("0보다 작을 수 없습니다.");
  });
});

describe("위치 값 증가", () => {
  it("증가", () => {
    const position = new Position(10);

    position.increase();

    expect(position.value).toEqual(11);
  });
});
