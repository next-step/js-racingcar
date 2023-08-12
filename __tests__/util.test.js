import { getRandomIntInclusive, generateRandomCarNames } from "../src/utils";

test.each([
  [0, 2],
  [0.9, 2.9],
])("getRandomIntInclusive", (min, max) => {
  for (let i = 0; i < 1000; ++i) {
    const value = getRandomIntInclusive(min, max);
    expect(value).toBeGreaterThanOrEqual(Math.ceil(min));
    expect(value).toBeLessThanOrEqual(Math.floor(max));
  }
});

test.each([[1], [3], [5]])("generateRandomCarNames", (count) => {
  const carNames = generateRandomCarNames(count);
  expect(carNames.length).toEqual(count);
});
