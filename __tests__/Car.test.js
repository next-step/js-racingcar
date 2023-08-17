import { Car } from "../src/domain/Car";
import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  DEFAULT_CAR_CONFIG,
} from "../src/constants";
import { CarNameError } from "../src/errors";
import { generateRandomString } from "../src/utils";

const TEST_CAR_NAME = "car1";

describe("Test class Car", () => {
  it("should be granted a valid name", () => {
    expect(() => new Car()).toThrow(CarNameError);
    const tooShortName = generateRandomString(CAR_NAME_MIN_LENGTH - 1);
    expect(() => new Car(tooShortName)).toThrow(CarNameError);
    const tooLongName = generateRandomString(CAR_NAME_MAX_LENGTH + 1);
    expect(() => new Car(tooLongName)).toThrow(CarNameError);
  });

  const car = new Car(TEST_CAR_NAME);
  it("should have a name", () => {
    expect(car.name).toEqual(TEST_CAR_NAME);
  });

  it("should have a current position", () => {
    expect(car.position).toEqual(0);
  });

  it("should move if the random number is greater than or equal to the threshold", () => {
    let carPosition = car.position;
    car.move(DEFAULT_CAR_CONFIG.MOVE_THRESHOLD - 1);
    expect(car.position).toEqual(carPosition);

    carPosition = car.position;
    car.move(DEFAULT_CAR_CONFIG.MOVE_THRESHOLD);
    expect(car.position).toEqual(carPosition + 1);

    carPosition = car.position;
    car.move(DEFAULT_CAR_CONFIG.MOVE_THRESHOLD + 1);
    expect(car.position).toEqual(carPosition + 1);
  });
});
