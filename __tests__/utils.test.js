import { getRandomNumber, parseCarNames, parseLaps, parseOutput, printError } from "../src/utils";

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

  it("should throw an error if min value is greater than max value", () => {
    const min = 9;
    const max = 8;

    expect(() => getRandomNumber(min, max)).toThrow(MESSAGE.INPUT_RANGE_ERROR);
  });
});

describe("parseCarNames()", () => {
  it("should return an array of car names", () => {
    const input = "pobi,crong,honux";

    const cars = parseCarNames(input);

    expect(cars).toStrictEqual(["pobi", "crong", "honux"]);
  });

  it("should throw an error if input is an empty string", () => {
    const input = "";

    expect(() => parseCarNames(input)).toThrow(MESSAGE.INPUT_LENGTH_ERROR);
  });
});

describe("parseLaps()", () => {
  it("should throw an error if input is not a number", () => {
    const input = "";

    expect(() => parseLaps(input)).toThrow(MESSAGE.INPUT_TYPE_ERROR);
  });

  it("should throw an error if input is not an integer", () => {
    const input = 0.123;

    expect(() => parseLaps(input)).toThrow(MESSAGE.INPUT_TYPE_ERROR);
  });

  it("should transform an input into an integer", () => {
    const input = "10";

    const laps = parseLaps(input);

    expect(laps).toBe(10);
  });
});

describe("parseOuput()", () => {
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

describe("printError()", () => {
  let errorLogSpy;

  beforeEach(() => {
    errorLogSpy = jest.spyOn(console, "error");
  });

  afterEach(() => {
    errorLogSpy.mockRestore();
  });

  it("should print error message", () => {
    const errorMessage = MESSAGE.INPUT_LENGTH_ERROR;

    const error = new Error(errorMessage);
    printError(error);

    expect(errorLogSpy).toBeCalledWith(`Error: ${error.message}`);
  });
});
