import {
  CAR_RUN_UNIT,
  CAR_START_POSITION,
  RACE_MAX_ROLL_NUMBER,
  RACE_MIN_CAR_COUNT,
  RACE_MIN_ROLL_NUMBER,
  RACE_MIN_WINNER_COUNT,
} from "../src/constants/Numbers";
import CarRacingController from "../src/controllers/CarRacingController";
import Car from "../src/models/Car";
import Race from "../src/models/Race";
import { getRandomInt } from "../src/utils";

const VALID_NAMES = ["jun", "joy", "sunny"];

describe("자동차 경주 테스트: ", () => {
  const mockReadline = {
    close: jest.fn(),
    question: jest.fn(() => VALID_NAMES.join(",")),
  };

  it("여러 자동차를 가질 수 있다.", () => {
    const cars = VALID_NAMES.map((name) => new Car(name));
    const race = new Race(cars);

    expect(race.getCars().length).toBeGreaterThanOrEqual(RACE_MIN_CAR_COUNT);
  });

  it(`자동차는 ${CAR_RUN_UNIT}씩 전진할 수 있다.`, () => {
    const car = new Car(VALID_NAMES[0]);
    car.move();

    expect(car.getPosition()).toBe(CAR_START_POSITION + CAR_RUN_UNIT);
  });

  it(`랜덤 값은 ${RACE_MIN_ROLL_NUMBER}에서 ${RACE_MAX_ROLL_NUMBER} 사이의 정수이다.`, () => {
    const cars = VALID_NAMES.map((name) => new Car(name));
    const race = new Race(cars);

    expect(
      getRandomInt(RACE_MIN_ROLL_NUMBER, RACE_MAX_ROLL_NUMBER)
    ).toBeGreaterThanOrEqual(RACE_MIN_ROLL_NUMBER);

    expect(
      getRandomInt(RACE_MIN_ROLL_NUMBER, RACE_MAX_ROLL_NUMBER)
    ).toBeLessThanOrEqual(RACE_MAX_ROLL_NUMBER);
  });

  it("우승자는 한 명 이상이다.", async () => {
    const carRacingController = new CarRacingController(mockReadline);
    await carRacingController.startRace();
    const race = carRacingController.getRace();

    expect(race.getWinners().length).toBeGreaterThanOrEqual(
      RACE_MIN_WINNER_COUNT
    );
  });
});
