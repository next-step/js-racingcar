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

  it("should have the current lap and it should be 0.", () => {
    expect(race.currentLap).toEqual(0);
  });

  it("should have the current position of cars and they should be all 0", () => {
    const currentPositions = race.getCurrentPositions();
    expect(currentPositions.length).toEqual(TEST_CARS.length);
    currentPositions.forEach(({ position }) => {
      expect(position).toEqual(0);
    });
  });

  it("should race for the given number of laps.", () => {
    const lapsBefore = race.currentLap;
    race.start(1);
    expect(race.currentLap).toEqual(lapsBefore + 1);
  });

  it("should race until the end", () => {
    race.start();
    expect(race.currentLap).toEqual(TEST_NUMBER_OF_LAPS);
  });

  it("should have one or more winners", () => {
    const winners = race.getWinnerNames();
    expect(winners.length).toBeGreaterThanOrEqual(MIN_NUM_OF_WINNERS);

    const currentPositions = race.getCurrentPositions();
    const carPositions = currentPositions.map(({ position }) => position);
    const maxPosition = Math.max(...carPositions);
    currentPositions.forEach(({ name, position }) => {
      if (winners.includes(name)) {
        expect(position).toEqual(maxPosition);
      } else {
        expect(position).toBeLessThan(maxPosition);
      }
    });
  });
});
