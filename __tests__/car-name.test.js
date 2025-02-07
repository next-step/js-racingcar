import Car from "../src/Car";
import carNameRule from "../src/rule";

describe("자동차 이름", () => {
  it("이름은 숫자와 string만 가능하다.", () => {
    const nameRegExp = carNameRule;

    const car = new Car("hojeong12");

    expect(car.getName()).toEqual("hojeong12");

    expect(nameRegExp.test(car.getName())).toEqual(true);
  });

  it("이름은 최소 1글자, 최대 9글자이어야 한다.", () => {
    const nameRegExp = carNameRule;

    // 길이가 0일 때
    const car = new Car("");
    const minLength = nameRegExp.test(car.getName());
    expect(minLength).toEqual(false);

    // 길이가 1일 때
    const oneCar = new Car("1");
    const minLengthOneCar = nameRegExp.test(oneCar.getName());
    expect(minLengthOneCar).toEqual(true);

    // 길이가 9일 때
    const nineCar = new Car("123456789");
    const minLengthNineCar = nameRegExp.test(nineCar.getName());
    expect(minLengthNineCar).toEqual(true);

    // 길이가 10일 때
    const tenCar = new Car("123456789A");
    const minLengthTenCar = nameRegExp.test(tenCar.getName());
    expect(minLengthTenCar).toEqual(false);
  });
});
