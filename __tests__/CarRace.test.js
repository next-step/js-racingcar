import { Car } from "../src/domain/Car";
import { CarRace } from "../src/domain/CarRace";
import {
  RACE_MAX_CAR,
  RACE_MIN_CAR,
  RACE_MAX_LAP,
  RACE_MIN_LAP,
} from "../src/constants";
import {
  RaceCarCountError,
  RaceLapCountError,
  RaceStateError,
} from "../src/errors";
import { generateRandomCarNames } from "../src/utils";

const TEST_CAR_NAMES = ["car1", "car2", "car3"];
const TEST_CARS = TEST_CAR_NAMES.map((carName) => new Car(carName));
const TEST_NUMBER_OF_LAPS = 10;
const MIN_NUM_OF_WINNERS = 1;

describe("CarRace class", () => {
  it("cannot start race before initialized", () => {
    const race = new CarRace();
    expect(() => race.start()).toThrow(RaceStateError);
  });

  it("should be set with proper number of cars", () => {
    const race = new CarRace();
    expect(() => race.setCars([])).toThrow(RaceCarCountError);
    const tooSmallCars = generateRandomCarNames(RACE_MIN_CAR - 1).map(
      (carName) => new Car(carName)
    );
    expect(() => race.setCars(tooSmallCars)).toThrow(RaceCarCountError);
    const tooManyCars = generateRandomCarNames(RACE_MAX_CAR + 1).map(
      (carName) => new Car(carName)
    );
    expect(() => race.setCars(tooManyCars)).toThrow(RaceCarCountError);
  });

  it("should be set with proper number of laps", () => {
    expect(() => race.setLaps(RACE_MIN_LAP - 1)).toThrow(RaceLapCountError);
    expect(() => race.setLaps(RACE_MAX_LAP + 1)).toThrow(RaceLapCountError);
  });

  const race = new CarRace();
  race.setCars(TEST_CARS);
  race.setLaps(TEST_NUMBER_OF_LAPS);

  race.start();
  it("should race for the set number of laps.", () => {
    expect(race.currentLap).toEqual(TEST_NUMBER_OF_LAPS);
  });

  const winners = race.getWinnerNames();
  it("should have one or more winners", () => {
    expect(winners.length).toBeGreaterThanOrEqual(MIN_NUM_OF_WINNERS);
  });
});
