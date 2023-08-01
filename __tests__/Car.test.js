import { ERROR_MESSAGE } from "../src/constants/Messages";
import { CAR, RACE } from "../src/constants/Numbers";
import CarRacingController from "../src/controllers/CarRacingController";
import Car from "../src/models/Car";
import Race from "../src/models/Race";

const VALID_NAMES = ["abc", "def", "ghi"];
const INVALID_NAMES = ["abcdef", ""];
const DUPLICATE_NAMES = ["abc", "abc"];

describe("자동차 이름 테스트: ", () => {
  describe("하나의 자동차에 이름을 정상적으로 입력할 때", () => {
    it("이름을 가질 수 있다.", () => {
      const car = new Car(VALID_NAMES[0]);

      expect(car.getName()).toBe(VALID_NAMES[0]);
    });
  });

  describe("하나의 자동차에 이름을 비정상적으로 입력할 때", () => {
    it("아무것도 입력하지 않으면 에러를 던진다.", () => {
      expect(() => {
        new Car();
      }).toThrow(ERROR_MESSAGE.INVALID_LENGTH);
    });

    it("5자 초과의 이름을 입력하면 에러를 던진다.", () => {
      expect(() => {
        new Car(INVALID_NAMES[0]);
      }).toThrow(ERROR_MESSAGE.INVALID_LENGTH);
    });

    it("1자 미만의 이름을 입력하면 에러를 던진다.", () => {
      expect(() => {
        new Car(INVALID_NAMES[1]);
      }).toThrow(ERROR_MESSAGE.INVALID_LENGTH);
    });
  });

  describe("여러 대의 자동차에 이름을 정상적으로 입력할 때", () => {
    const mockReadline = {
      question: jest.fn(() => VALID_NAMES.join(",")),
      close: jest.fn(),
    };

    it("자동차 이름은 쉼표(,)를 기준으로 구분한다.", async () => {
      const carRacingController = new CarRacingController(mockReadline);
      await carRacingController.startRace();
      const race = carRacingController.getRace();
      const carNames = race.getCars().map((car) => car.getName());

      expect(carNames).toEqual(VALID_NAMES);
    });
  });

  describe("여러 대의 자동차에 이름을 비정상적으로 입력할 때", () => {
    const mockReadline = {
      close: jest.fn(),
    };

    it(`${CAR.NAME_MIN_LENGTH} 미만이거나 ${CAR.NAME_MAX_LENGTH} 초과의 이름을 입력하면 에러를 던진다.`, async () => {
      mockReadline.question = jest.fn(() => INVALID_NAMES.join(","));

      try {
        const carRacingController = new CarRacingController(mockReadline);
        await carRacingController.startRace();
      } catch (e) {
        expect(e.message).toBe(ERROR_MESSAGE.INVALID_LENGTH);
      }
    });

    it(`중복되는 이름을 입력하면 에러를 던진다.`, async () => {
      mockReadline.question = jest.fn(() => DUPLICATE_NAMES.join(","));

      try {
        const carRacingController = new CarRacingController(mockReadline);
        await carRacingController.startRace();
      } catch (e) {
        expect(e.message).toBe(ERROR_MESSAGE.DUPLICATE_NAME);
      }
    });
  });
});

describe("자동차 경주 테스트: ", () => {
  const mockReadline = {
    close: jest.fn(),
    question: jest.fn(() => VALID_NAMES.join(",")),
  };

  it("여러 자동차를 가질 수 있다.", () => {
    const cars = VALID_NAMES.map((name) => new Car(name));
    const race = new Race(cars);

    expect(race.getCars().length).toBeGreaterThanOrEqual(RACE.MIN_CAR_COUNT);
  });

  it(`자동차는 ${CAR.RUN_UNIT}씩 전진할 수 있다.`, () => {
    const car = new Car(VALID_NAMES[0]);
    car.move();

    expect(car.getPosition()).toBe(CAR.START_POSITION + CAR.RUN_UNIT);
  });

  it(`랜덤 값은 ${RACE.MIN_ROLL_NUMBER}에서 ${RACE.MAX_ROLL_NUMBER} 사이의 정수이다.`, () => {
    const cars = VALID_NAMES.map((name) => new Car(name));
    const race = new Race(cars);

    expect(
      race.getRandomInt(RACE.MIN_ROLL_NUMBER, RACE.MAX_ROLL_NUMBER)
    ).toBeGreaterThanOrEqual(RACE.MIN_ROLL_NUMBER);

    expect(
      race.getRandomInt(RACE.MIN_ROLL_NUMBER, RACE.MAX_ROLL_NUMBER)
    ).toBeLessThanOrEqual(RACE.MAX_ROLL_NUMBER);
  });

  it("우승자는 한 명 이상이다.", async () => {
    const carRacingController = new CarRacingController(mockReadline);
    await carRacingController.startRace();
    const race = carRacingController.getRace();

    expect(race.getWinners().length).toBeGreaterThanOrEqual(
      RACE.MIN_WINNER_COUNT
    );
  });

  // it(`경주는 ${RACE.MAX_ROUND}회 진행된다.`, async () => {
  //   const carRacingController = new CarRacingController(mockReadline);
  //   await carRacingController.startRace();
  //   const race = carRacingController.getRace();

  //   const spyPlayOneRound = jest.spyOn(race, "playOneRound");

  //   expect(spyPlayOneRound).toHaveBeenCalledTimes(RACE.MAX_ROUND);
  // });
});
