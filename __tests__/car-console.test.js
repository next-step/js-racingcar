import Car from "../src/Car.js";

jest.mock("readline");

describe("콘솔 게임을 실행", () => {
  let readline;
  let read;
  beforeAll(async () => {
    readline = (await import("readline")).default;
    read = readline.createInterface();
  });

  it("1. 자동차에 이름을 부여한다.", async () => {
    const carName = await read.question(
      "경주할 자동차 이름을 입력하세요.",
      "car1",
    );
    expect(carName).toEqual(["car1"]);
  });

  it("1-1. 전진하는 자동차를 출력 시, 자동차 이름을 같이 출력", async () => {
    const carNames = await read.question(
      "경주할 자동차 이름을 입력하세요.",
      "car1, car2, car3",
    );
    expect(carNames).toEqual(["car1", "car2", "car3"]);

    // const instance = new Car(carName);
  });

  it("2. 자동차 여러 대의 이름을 부여한다. - 쉼표를 기준", async () => {
    const carNames = await read.question(
      "경주할 자동차 이름을 입력하세요.",
      "car1, car2, car3",
    );
    expect(carNames).toEqual(["car1", "car2", "car3"]);
  });

  test("2-1. 자동차 여러 대의 이름을 부여한다. - 5자 이하만 가능", async () => {
    await expect(async () => {
      await read.question(
        "경주할 자동차 이름을 입력하세요.",
        "car1, car2, car345",
      );
    }).rejects.toThrow("자동차 이름이 5자를 초과합니다.");
  });

  // test("3. 자동차 경주는 5회로 고정하여 진행");
});
