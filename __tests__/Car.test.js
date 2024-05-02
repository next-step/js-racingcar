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
    }).toThrow("자동차의 이름은 5 이하만 가능합니다.");
  });

  test("자동차는 값이 4 이상일 경우 전진할 수 있다.", () => {
    // given
    const car = new Car("crong");

    // when
    car.move(5);

    // then
    expect(car.position).toBe(1);
  });

  test("자동차는 값이 3 이하인 경우 전진할 수 없다.", () => {
    // given
    const car = new Car("crong");

    // when
    car.move(1);

    // then
    expect(car.position).toBe(0);
  });
});
