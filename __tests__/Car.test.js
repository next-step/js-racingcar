import Car from "../src/class/Car";

describe("Car Class 테스트", () => {
  test("자동차 이름이 빈값이면 에러가 발생한다.", () => {
    expect(() => new Car("")).toThrowError("자동차 이름은 빈값일 수 없습니다.");
  });

  test("자동차 이름이 6자 이상이면 에러가 발생한다.", () => {
    expect(() => new Car("123456")).toThrowError(
      "자동차 이름은 5자를 넘길 수 없습니다.",
    );
  });

  const carNameTypeTestCases = [{}, 1, () => {}, undefined];

  carNameTypeTestCases.forEach((carName) => {
    test(`자동차 이름의 자료형이 ${typeof carName}일때 에러가 발생한다`, () => {
      expect(() => new Car(carName)).toThrowError(
        "자동차 이름은 문자열이여야 합니다.",
      );
    });
  });

  test("advanceCondition이 true를 반환하면 distance가 1 증가한다.", async () => {
    const mockAdvanceCondition = () => true;

    const car = new Car("test");

    car.advance(mockAdvanceCondition);

    expect(car.distance).toBe(1);
  });

  test("advanceCondition이 false를 반환하면 distance 유지된다.", async () => {
    const mockAdvanceCondition = () => false;

    const car = new Car("test");

    car.advance(mockAdvanceCondition);

    expect(car.distance).toBe(0);
  });
});
