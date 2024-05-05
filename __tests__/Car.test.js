import Car from "../src/Car";

describe("Car class", () => {
  describe("Name property", () => {
    it("should have a name property", () => {
      const name = "pobi";

      const car = new Car(name);

      expect(car).toHaveProperty("name");
    });

    it("should throw an error if the name is longer than 5 characters", () => {
      const name = "abcdef";

      expect(() => new Car(name)).toThrow("Name must be 5 characters or fewer");
    });
  });

  describe("move()", () => {
    it("should increase position by 1 if the given value is greater than or equal to 4", () => {
      const name = "pobi";
      const value = 4;
      const car = new Car(name);

      expect(car.position).toBe(0);

      car.move(value);

      expect(car.position).toBe(1);
    });

    it("should remain in the same position when the given value is less than 4", () => {
      const name = "pobi";
      const value = 3;
      const car = new Car(name);

      expect(car.position).toBe(0);

      car.move(value);

      expect(car.position).toBe(0);
    });
  });

  describe("printPosition()", () => {
    let logSpy;
    const name = "pobi";

    beforeEach(() => {
      logSpy = jest.spyOn(console, "log");
    });

    afterEach(() => {
      logSpy.mockRestore();
    });

    it("should print the correct position", () => {
      const position = 4;
      const car = new Car(name, position);

      car.printPosition();
      expect(logSpy).toBeCalledWith("pobi : ----");
    });

    it("should print the zero position", () => {
      const car = new Car(name);

      car.printPosition();
      expect(logSpy).toBeCalledWith("pobi : ");
    });
  });
});
