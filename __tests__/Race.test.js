import { DUPLICATE_NAME } from "../src/constants/ErrorMessages";
import { INPUT_CAR_NAMES, TRIAL_NUM_OF_ROUND } from "../src/constants/Messages";
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
const DUPLICATE_NAMES = ["jun", "jun"];
let mockReadline;

describe("자동차 이름 중복 테스트: ", () => {
  it(`중복되는 이름을 입력하면 에러를 던진다.`, async () => {
    try {
      new Race(DUPLICATE_NAMES.map((name) => new Car(name)));
    } catch (e) {
      expect(e.message).toBe(DUPLICATE_NAME);
    }
  });
});

describe("이동 회수 입력 테스트: ", () => {
  beforeAll(() => {
    mockReadline = {
      close: jest.fn(),
    };
  });

  it("사용자는 몇 번의 이동을 할 것인지를 입력할 수 있어야 한다.", async () => {
    mockReadline.question = jest.fn((query) => {
      if (query === `${TRIAL_NUM_OF_ROUND}\n`) return `${3}`;
      if (query === `${INPUT_CAR_NAMES}\n`) return VALID_NAMES.join(",");
    });

    const carRacingController = new CarRacingController(mockReadline);

    const number = await carRacingController.readNumOfRound();

    expect(number).toEqual(3);
  });
});

describe("자동차 경주 테스트: ", () => {
  beforeAll(() => {
    mockReadline = {
      question: jest.fn((query) => {
        if (query === `${TRIAL_NUM_OF_ROUND}\n`) return "3";
        if (query === `${INPUT_CAR_NAMES}\n`) return VALID_NAMES.join(",");
      }),
      close: jest.fn(),
    };
  });

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
