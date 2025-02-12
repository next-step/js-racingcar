import Car, { InvalidCarName } from "../src/Car";

describe("자동차 클래스 테스트", () => {
  it("자동차는 이름과 위치 값을 갖는다.", () => {
    const car = new Car("강은비");

    expect(car).toEqual({ name: "강은비", position: 0 });
  });

  test.each(["", "asdfsdf", 1235])(
    "유효하지 않은 이름 입력 시 오류가 발생한다. (이름: %p)",
    (name) => {
      expect(() => new Car(name)).toThrow(InvalidCarName);
    }
  );

  it("자동차는 기본적으로 전진할 수 있으며 한 번에 1만큼 전진한다.", () => {
    const car = new Car("강은비");

    expect(car.position).toBe(0);

    car.moveForward();

    expect(car.position).toBe(1);
  });

  it("자동차는 전진할 수 없을 때 전진하지 않는다.", () => {
    const car = new Car("강은비");

    expect(car.position).toBe(0);

    car.moveForward(() => false);

    expect(car.position).toBe(0);
  });
});
