import Car from "../src/Car";
import { getWinners, createCars } from "../src/racing";

describe("getWinners()", () => {
  it("should return an array of the highest scorer as winner", () => {
    const car1 = new Car("pobi", 1);
    const car2 = new Car("honux", 3);
    const car3 = new Car("crong", 2);

    const winners = getWinners([car1, car2, car3]);

    expect(winners).toStrictEqual(["honux"]);
  });

  it("should return an array of all winners in a tie", () => {
    const car1 = new Car("pobi", 3);
    const car2 = new Car("honux", 3);
    const car3 = new Car("crong", 3);

    const winners = getWinners([car1, car2, car3]);

    expect(winners).toStrictEqual(["pobi", "honux", "crong"]);
  });
});

describe("createCars()", () => {
  it("should return an array of car instances", () => {
    const car1 = new Car("pobi");
    const car2 = new Car("honux");
    const car3 = new Car("crong");
    const names = ["pobi", "honux", "crong"];

    const cars = createCars(names, Car);

    expect(cars).toStrictEqual([car1, car2, car3]);
  });
});
