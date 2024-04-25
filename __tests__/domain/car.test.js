import { Car } from "../../src/domain/car.js";

describe("객체 생성", () => {
  it("생성", () => {
    const car = new Car('name');
    expect(car).toEqual(new Car('name'));
  });
});

describe("이동", () => {
  let car;

  beforeEach(() => {
    car = new Car('name');
  });

  it("이동", () => {
    car.move(4);

    expect(car).toEqual(new Car('name', 1));
  });

  it("정지", () => {
    car.move(3);

    expect(car).toEqual(new Car('name', 0));
  });
});
