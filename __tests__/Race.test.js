import { ROUNDS } from "../src/constants";
import Race from "../src/services/race";

describe("Race 클래스 테스트", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(global.console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("자동차 경주는 5회로 고정하여 진행한다.", () => {
    const race = new Race("boky");
    race.start();
    expect(consoleSpy).toHaveBeenCalledTimes(ROUNDS);
  });

  it("자동차는 1회당 1칸씩 전진한다", () => {
    const race = new Race("boky");
    race.start();
    expect(consoleSpy.mock.calls[0][0]).toBe("boky : -");
    expect(consoleSpy.mock.calls[1][0]).toBe("boky : --");
    expect(consoleSpy.mock.calls[2][0]).toBe("boky : ---");
    expect(consoleSpy.mock.calls[3][0]).toBe("boky : ----");
    expect(consoleSpy.mock.calls[4][0]).toBe("boky : -----");
  });
});
