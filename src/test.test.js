describe("자동차 이름 유효성 검사", () => {
  it("자동차 이름 최대 5글자", () => {
    expect(true).toBe(false);
  });

  it("자동차 개수 최소 2개", () => {
    expect(1).toBeGreaterThan(2);
  });
});
