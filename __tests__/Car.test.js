import Car from "../src/domain/Car.js";

describe("자동차 기능 테스트", () => {
  test("자동차의 이름은 5자 이하로 가진다", () => {
    // given
    const car = new Car("12345");

    // when
    const name = car.name;

    // then
    expect(name.length).toBe(5);
  });

  test("자동차의 이름이 6 이상이면 오류가 발생한다.", () => {
    const name = "abcdef";
    expect(() => {
      new Car(name);
    }).toThrow("자동차 이름은 1자 이상 5자 이하로 입력해주세요.");
  });
});
