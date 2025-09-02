import { Cars } from "../../../src/domain/cars.js";

describe("cars", () => {
  it("자동차 이름은 쉼표(,)를 기준으로 구분하여 Cars의 인스턴스를 생성합니다.", () => {
    const carNames = "가나다라마,바사아자차,카타파하";
    const cars = Cars.fromNames(carNames);
    expect(cars.value.length).toEqual(3);
  });
  it("자동차 이름에 쉼표(,)가 없으면 에러가 발생합니다.", () => {
    const carNameList = [
      "가나다라마.바사아자차.카타파하",
      "가나다라마|바사아자차|카타파하",
    ];
    expect(() => Cars.fromNames(carNameList[0])).toThrow();
    expect(() => Cars.fromNames(carNameList[1])).toThrow();
  });
  it("자동차 이름이 5글자 이하이고 쉼표가 없어도 Cars의 인스턴스를 생성할 수 있습니다.", () => {
    const carName = "안녕하세요";
    const cars = Cars.fromNames(carName);
    expect(cars.value.length).toEqual(1);
  });
});
