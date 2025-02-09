import Car from "../src/Car";

describe("자동차 클래스 테스트", () => {
  it("자동차는 이름과 위치 값을 갖는다.", () => {
    const car = new Car("강은비");

    expect(car).toEqual({ name: "강은비", position: 0 });
  });

  test("유효하지 않은 이름 입력 시 오류가 발생한다.", () => {
    expect(() => new Car("")).toThrow(Car.VALIDATION_ERROR_MESSAGE);
    expect(() => new Car("abcdef")).toThrow(Car.VALIDATION_ERROR_MESSAGE);
  });

  it("자동차는 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car("강은비");

    expect(car.position).toBe(0);

    car.moveForward();

    expect(car.position).toBe(1);
  });
});
