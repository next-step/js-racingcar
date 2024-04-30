const { getRandomNumber, parseInput } = require("../src/utils");

const { MESSAGE } = require("../constants/message");

describe("getRandomNumber()", () => {
  it("should return a random number in a given range", () => {
    const min = 0;
    const max = 9;

    const randomNumber = getRandomNumber(min, max);

    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });

  it("should throw an error if one of the inputs is not a number", () => {
    const min = "abcd";
    const max = 9;

    expect(() => getRandomNumber(min, max)).toThrow(TypeError);
  });
});

describe("parseInput()", () => {
  it("should return an array of car names", () => {
    const input = "pobi,crong,honux";

    const cars = parseInput(input);

    expect(cars).toEqual(["pobi", "crong", "honux"]);
  });

  it("should throw an error if input is an empty string", () => {
    const input = "";

    expect(() => parseInput(input)).toThrow(MESSAGE.INPUT_LENGTH_ERROR);
  });
});
