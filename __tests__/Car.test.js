import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
  DEFAULT_MOVE_THRESHOLD,
  Car,
  InvalidNameError,
} from "../src/Car";

const TEST_CAR_NAME = "car1";

// https://www.slingacademy.com/article/ways-to-generate-random-strings-in-javascript/
const generateRandomString = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

describe("Test class Car", () => {
  it("should be granted a valid name", () => {
    expect(() => new Car()).toThrow(InvalidNameError);
    const tooShortName = generateRandomString(CAR_NAME_MIN_LENGTH - 1);
    expect(() => new Car(tooShortName)).toThrow(InvalidNameError);
    const tooLongName = generateRandomString(CAR_NAME_MAX_LENGTH + 1);
    expect(() => new Car(tooLongName)).toThrow(InvalidNameError);
  });

  // console.assert(
  //   TEST_CAR_NAME.length < CAR_NAME_MIN_LENGTH ||
  //     TEST_CAR_NAME.length > CAR_NAME_MAX_LENGTH,
  //   '"TEST_CAR_NAME" is invalid.'
  // );
  const car = new Car(TEST_CAR_NAME);
  it("should have a name", () => {
    expect(car.name).toEqual(TEST_CAR_NAME);
  });

  it("should have a current position", () => {
    expect(car.position).toEqual(0);
  });

  it("should move if the random number is greater than or equal to the threshold", () => {
    let carPosition = car.position;
    car.move(DEFAULT_MOVE_THRESHOLD - 1);
    expect(car.position).toEqual(carPosition);

    carPosition = car.position;
    car.move(DEFAULT_MOVE_THRESHOLD);
    expect(car.position).toEqual(carPosition + 1);

    carPosition = car.position;
    car.move(DEFAULT_MOVE_THRESHOLD + 1);
    expect(car.position).toEqual(carPosition + 1);
  });
});
