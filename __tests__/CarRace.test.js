import { DEFAULT_CONFIG, CarRace, InvalidCarNamesError } from "../src/CarRace";

const TEST_CAR_NAMES = ["car1", "car2", "car3"];
const MIN_NUM_OF_WINNERS = 1;

describe("Test class CarRace", () => {
  it("should initiated with valid car names", () => {
    expect(() => new CarRace()).toThrow(InvalidCarNamesError);
    expect(() => new CarRace("")).toThrow(InvalidCarNamesError);
  });

  const race = new CarRace(TEST_CAR_NAMES.join(","));

  it("should have car names", () => {
    expect(race.getCarNames().sort()).toEqual(TEST_CAR_NAMES.sort());
  });

  race.run();

  const winners = race.getWinners();
  it("should have one or more winners", () => {
    expect(winners?.length).toBeGreaterThanOrEqual(MIN_NUM_OF_WINNERS);
  });
});
