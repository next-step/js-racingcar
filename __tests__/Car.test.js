import {
  DUPLICATE_NAME,
  INVALID_CAR_NAME_LENGTH,
} from "../src/constants/ErrorMessages";
import {
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_MIN_LENGTH,
} from "../src/constants/Numbers";
import CarRacingController from "../src/controllers/CarRacingController";
import Car from "../src/models/Car";

const VALID_NAMES = ["jun", "joy", "sunny"];
const INVALID_NAMES = {
  MORE_THAN_MAX_LENGTH: "jueunchoi",
  LESS_THAN_MIN_LENGTH: "",
};
const DUPLICATE_NAMES = ["jun", "jun"];

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
      }).toThrow(INVALID_CAR_NAME_LENGTH);
    });

    it("5자 초과의 이름을 입력하면 에러를 던진다.", () => {
      expect(() => {
        new Car(INVALID_NAMES.MORE_THAN_MAX_LENGTH);
      }).toThrow(INVALID_CAR_NAME_LENGTH);
    });

    it("1자 미만의 이름을 입력하면 에러를 던진다.", () => {
      expect(() => {
        new Car(INVALID_NAMES.LESS_THAN_MIN_LENGTH);
      }).toThrow(INVALID_CAR_NAME_LENGTH);
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

    it(`${CAR_NAME_MIN_LENGTH} 미만이거나 ${CAR_NAME_MAX_LENGTH} 초과의 이름을 입력하면 에러를 던진다.`, async () => {
      mockReadline.question = jest.fn(() =>
        Object.values(INVALID_NAMES).join(",")
      );

      try {
        const carRacingController = new CarRacingController(mockReadline);
        await carRacingController.startRace();
      } catch (e) {
        expect(e.message).toBe(INVALID_CAR_NAME_LENGTH);
      }
    });

    it(`중복되는 이름을 입력하면 에러를 던진다.`, async () => {
      mockReadline.question = jest.fn(() => DUPLICATE_NAMES.join(","));

      try {
        const carRacingController = new CarRacingController(mockReadline);
        await carRacingController.startRace();
      } catch (e) {
        expect(e.message).toBe(DUPLICATE_NAME);
      }
    });
  });
});
