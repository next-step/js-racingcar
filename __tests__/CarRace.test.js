class CarRace {}

const TEST_CAR_NAMES = ["car1", "car2", "car3"];

describe("Test class CarRace", () => {
  const race = new CarRace();

  race.init(TEST_CAR_NAMES);

  it("should have car names", () => {
    expect(race.getCarNames().sort()).toEqual(TEST_CAR_NAMES.sort());
  });

  race.run();

  const winners = race.getWinners();
  it("should have one or more winners", () => {
    expect(winners?.length).toBeGreaterThanOrEqual(1);
  });
});
