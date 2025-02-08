import {
  isNameLessThanFive,
  makeToArray,
  race,
  makeCarObject,
  print,
  printWithCarName,
} from "../src/console.js";

jest.mock("readline");

describe("콘솔 게임을 실행", () => {
  let readline;
  let read;
  beforeAll(async () => {
    readline = (await import("readline")).default;
    read = readline.createInterface();
  });

  describe("초기 상태 : car Location - (0,0,0)", () => {
    it("1. 자동차에 이름을 부여한다.", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1";
      const expectedCarName = ["car1"];

      const response = await read.question(input, carName);
      const actualCarName = makeToArray(response);

      expect(expectedCarName).toEqual(actualCarName);
    });

    it("1-1. 자동차 여러 대의 이름을 부여한다. - 쉼표를 기준", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1, car2, car3";
      const expectedCarName = ["car1", "car2", "car3"];

      const response = await read.question(input, carName);
      const actualCarName = makeToArray(response);
      expect(expectedCarName).toEqual(actualCarName);
    });

    test("2-1. 자동차 여러 대의 이름을 부여한다. - 5자 이하만 가능", async () => {
      const input = "경주할 자동차 이름을 입력하세요.";
      const carName = "car1, car2, car345";
      const expectedResult = false;

      const response = await read.question(input, carName);
      const actualResult = isNameLessThanFive(makeToArray(response));
      expect(expectedResult).toBe(actualResult);
    });

    test("3. 자동차 경주는 5회로 고정하여 진행", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
      const expectedGameCount = 5;

      // when
      const actualGameCount = race(carObjs, 5).length;

      // then
      expect(expectedGameCount).toBe(actualGameCount);
    });

    test("4. 각 loop마다 자동차가 지나간 궤적을 기록", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3], { x: 0, y: 0, z: 0 });
      const expectedResult = ["YXXYY", "YZZZZ", "YZZYY"];

      // when
      const actualResult = print(carObjs, [
        ["Y", "Y", "Y"],
        ["X", "Z", "Z"],
        ["X", "Z", "Z"],
        ["Y", "Z", "Y"],
        ["Y", "Z", "Y"],
      ]);

      // then
      expect(expectedResult).toEqual(actualResult);
    });

    it("4-1. 전진하는 자동차를 출력 시, 자동차 이름을 같이 출력", async () => {
      // given
      const carName = 1;
      const result = ["Y", "Y", "Y"];
      const expectedResult = "1: Y,Y,Y";

      // when
      const actualResult = printWithCarName(carName, result);
      expect(actualResult).toEqual(expectedResult);
    });

    test("4-1. 자동차가 지나간 궤적을 출력", () => {
      // given
      const carObjs = makeCarObject([1, 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      // when
      const actualResultLength = race(carObjs, 5)[0].join("").length;

      // then
      expect(5).toBe(actualResultLength);
    });
    test("5. 사용자가 잘못된 이름을 작성한 경우, 프로그램을 종료", () => {
      // given
      expect(() => {
        makeCarObject(["!!", 2, 3, 4, 5], { x: 0, y: 0, z: 0 });
      }).toThrow("생성할 수 없는 이름입니다.");
    });
  });
});
