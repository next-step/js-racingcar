describe("자동차 이름 유효성 검사", () => {
  it("자동차 이름 최대 5글자", () => {
    expect(true).toBe(false);
  });

  it("자동차 개수 최소 2개", () => {
    expect(1).toBeGreaterThan(2);
  });
});

describe("0 에서 9 사이의 무작위 값을 구한 후 4이 상일 때 전진한다.", () => {
  it("무작위 값이 3 이하 일때", () => {
    expect(0).toBe(1);
  });

  it("무작위 값이 4 이상 일때", () => {
    expect(1).toBe(0);
  });
});

describe("자동차 경주", () => {
  it("우승자 이름 출력", () => {
    expect("").toBe("suin");
  });
});
