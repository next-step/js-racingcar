import {
  CarRacingManager,
  ERROR_MESSAGES,
  INTEGERS_UNDER_TEN,
} from "../src/CarRacingManager";

describe("자동자 경주 게임", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe("경주 셋팅", () => {
    test("이름은 쉼표(,)를 기준으로 구분하여 받는다.", () => {
      const carRacingManager = new CarRacingManager();

      carRacingManager.names = "뽀로로, 크롱, 루피";

      expect(carRacingManager.names).toEqual(["뽀로로", "크롱", "루피"]);
    });

    test("한 이름은 5자 이하만 가능하다.", () => {
      const carRacingManager = new CarRacingManager();

      function setNameOverMaximumLength() {
        carRacingManager.names = "뽀로로, 크롱크롱크롱, 루피";
      }

      expect(setNameOverMaximumLength).toThrowError(
        ERROR_MESSAGES.OVER_MAXIMUM_NAME_LENGTH
      );
    });

    test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
      const carRacingManager = new CarRacingManager();
      const processEnd = jest.fn();

      carRacingManager.gameStart("뽀로로, 크롱크롱크롱, 루피", processEnd);

      expect(processEnd).toBeCalled();
    });
  });

  describe("경주 진행", () => {
    test("전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다.", () => {
      const carRacingManager = new CarRacingManager();

      INTEGERS_UNDER_TEN.forEach((v) => {
        if (v >= 4) {
          expect(carRacingManager.canMove(v)).toBeTruthy();
        } else {
          expect(carRacingManager.canMove(v)).toBeFalsy();
        }
      });
    });

    test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
      const carRacingManager = new CarRacingManager();
      const spyOn = jest.spyOn(console, "log");

      carRacingManager.printCarAndMove("뽀로로", 3);

      expect(spyOn).toBeCalledWith("뽀로로: ---");
    });

    test("자동차 경주는 5회로 고정하여 진행한다.", () => {
      const carRacingManager = new CarRacingManager();
      const roundStart = jest.spyOn(carRacingManager, "roundStart");
      const processEnd = () => {};
      const sleep = () => {};

      carRacingManager.gameStart("뽀로로, 크롱, 루피", processEnd, sleep);

      expect(roundStart).toBeCalledTimes(5);
    });
  });

  describe("우승자 출력", () => {
    test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.", () => {
      const carRacingManager = new CarRacingManager();
      const printGameEndMessage = jest.spyOn(
        carRacingManager,
        "printGameEndMessage"
      );
      const processEnd = () => {};
      const sleep = () => {};

      carRacingManager.gameStart("뽀로로, 크롱, 루피", processEnd, sleep);

      expect(printGameEndMessage).toBeCalledWith(
        `winner is ${carRacingManager.winner}`
      );
    });

    test.skip("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {});
  });
});
