import { generateCars } from "../src/domain/generateCars";

const generateCases = [
  { inputName: "navy", expected: 1 },
  { inputName: "navy,white,gray", expected: 3 },
];
describe.each(generateCases)("자동차 생성", ({ inputName, expected }) => {
  test(`${inputName}의 자동차의 이름이 주어졌을 때, 자동차 ${expected}개가 생성된다.`, () => {
    const cars = generateCars(inputName);
    expect(cars.length).toBe(expected);
  });
});
