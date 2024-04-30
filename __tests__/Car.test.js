const { Car } = require("../src/Car");

describe("Car class", () => {
  it("should have a name property", () => {
    const name = "pobi";

    const car = new Car(name);

    expect(car).toHaveProperty("name");
  });

  it("should throw an error if the name is longer than 5 characters", () => {
    const name = "abcdefrr";

    expect(() => new Car(name)).toThrow("Name must be 5 characters or fewer");
  });
});
