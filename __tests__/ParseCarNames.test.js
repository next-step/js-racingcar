import ParseCarNames from "../src/services/parse-car-names";

describe("자동차 이름은 쉼표(,)를 기준으로 구분하며 이름은 5자 이하만 가능하다.", () => {
  it("자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {
    const carNameParser = new ParseCarNames("boky1, boky2");
    expect(carNameParser.parse()).toEqual(["boky1", "boky2"]);
  });

  it("이름은 5자 이하만 가능하다.", () => {
    const carNameParser = new ParseCarNames("여섯글자이름");
    expect(() => carNameParser.parse()).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });
});
