import { INVALID_CAR_NAME_LENGTH } from "../src/constants/ErrorMessages";
import { INPUT_CAR_NAMES, TRIAL_NUM_OF_ROUND } from "../src/constants/Messages";
import CarRacingController from "../src/controllers/CarRacingController";
import Car from "../src/models/Car";

const VALID_NAMES = ["jun", "joy", "sunny"];
const INVALID_NAMES = {
  MORE_THAN_MAX_LENGTH: "jueunchoi",
  LESS_THAN_MIN_LENGTH: "",
};

let mockReadline;

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
    beforeAll(() => {
      mockReadline = {
        question: jest.fn((query) => {
          if (query === `${TRIAL_NUM_OF_ROUND}\n`) return "3";
          if (query === `${INPUT_CAR_NAMES}\n`) return VALID_NAMES.join(",");
        }),
        close: jest.fn(),
      };
    });

    it("자동차 이름은 쉼표(,)를 기준으로 구분한다.", async () => {
      const carRacingController = new CarRacingController(mockReadline);

      await carRacingController.startRace();
      const race = carRacingController.getRace();
      const carNames = race.getCars().map((car) => car.getName());

      expect(carNames).toEqual(VALID_NAMES);
    });
  });
});
