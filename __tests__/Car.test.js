import Car from "../src/domain/Car";

describe("자동차 기능 테스트", () => {
  test("자동차의 이름은 5자 이하", () => {
    // given
    const car = new Car("ganu");

    // when
    const name = car.name;

    // then
    expect(name.length).toBeLessThanOrEqual(5);
  });

  test("자동차의 이름이 5자 초과일 경우 에러 발생", () => {
    // given
    const carName = "lettuce";

    // when
    const setCarName = () => {
      return new Car(carName);
    };

    // then
    expect(setCarName).toThrow("이름은 5자 이하여야 합니다.");
  });
});
