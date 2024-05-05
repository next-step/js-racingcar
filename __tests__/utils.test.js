import { getRandomNumber, parseInput, parseOutput } from "../src/utils";

import { MESSAGE } from "../constants/message";

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

    expect(cars).toStrictEqual(["pobi", "crong", "honux"]);
  });

  it("should throw an error if input is an empty string", () => {
    const input = "";

    expect(() => parseInput(input)).toThrow(MESSAGE.INPUT_LENGTH_ERROR);
  });
});

describe("parseOuput", () => {
  it("should return a string, separated by comma", () => {
    const input = ["pobi", "crong"];

    const output = parseOutput(input);

    expect(output).toBe("pobi,crong");
  });

  it("should throw an error if input is not an array", () => {
    const input = "abc";

    expect(() => parseOutput(input)).toThrow(MESSAGE.INPUT_NOT_ARRAY_ERROR);
  });
});
