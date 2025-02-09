import Car from "../src/domain/Car";
import Race from "../src/domain/Race";

describe("경주 테스트", () => {
  const DEFAULT_ROUNDS = 5;
  it("경주는 5회로 고정하여 진행한다.", () => {
    const gv80 = new Car("GV80");
    const g90 = new Car("G90");
    const race = new Race([gv80, g90]);
    expect(race.rounds).toBe(DEFAULT_ROUNDS);
  });
});
