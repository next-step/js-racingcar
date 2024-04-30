const { Car } = require("../src/Car");
const { getWinners } = require("../src/racing");

describe("getWinners()", () => {
  it("should return an array of winners", () => {
    const car1 = new Car("pobi", 1);
    const car2 = new Car("honux", 3);
    const car3 = new Car("crong", 2);

    const winners = getWinners(car1, car2, car3);

    expect(winners).toEqual(["honux"]);
  });

  it("should return an array of winners", () => {
    const car1 = new Car("pobi", 3);
    const car2 = new Car("honux", 3);
    const car3 = new Car("crong", 3);

    const winners = getWinners(car1, car2, car3);

    expect(winners).toEqual(["pobi", "honux", "crong"]);
  });
});
