import { startRacing } from "../src";

describe("자동차 경주 테스트", () => {
  test("자동차 경주는 5회로 고정하여 진행한다.", () => {
    const racer = startRacing("navy,red,black");

    expect(racer.currRound).toBe(5);
    expect(racer.maxRound).toBe(5);
  });

  test("자동차 이름은 쉼표(,)를 기준으로 구분한다.", () => {
    const racer = startRacing("navy,red,black");

    expect(racer.cars[0].name).toBe("navy");
    expect(racer.cars[1].name).toBe("red");
    expect(racer.cars[2].name).toBe("black");
  });
});
