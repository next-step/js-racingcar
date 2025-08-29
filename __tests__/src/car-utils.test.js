import { makeCarList, makeCarNameList } from "../../src/car-utils";

describe("car-utils", () => {
  it("자동차 이름은 쉼표(,)를 기준으로 구분합니다.", () => {
    const carNames = "가나다라마,바사아자차,카타파하";
    const carNameList = makeCarNameList(carNames);
    expect(carNameList).toEqual(["가나다라마", "바사아자차", "카타파하"]);
  });
  it("자동차 이름에 쉼표(,)가 없으면 에러가 발생합니다.", () => {
    const carNameList = [
      "가나다라마바사아",
      "가나다라마.바사아자차.카타파하",
      "가나다라마|바사아자차|카타파하",
    ];
    expect(() => makeCarNameList(carNameList[0])).toThrow();
    expect(() => makeCarNameList(carNameList[1])).toThrow();
    expect(() => makeCarNameList(carNameList[2])).toThrow();
  });
});
