import { CONDITIONS, INTERVAL_ROUND_TIME } from "../constants/constants";
import { CarModel } from "../model/CarModel";
import { CarRacingManager } from "./CarRacingManager";

describe("자동자 경주 게임", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("경주 셋팅", () => {
    test("이름은 쉼표(,)를 기준으로 구분하여 받는다.", () => {
      const carRacingManager = new CarRacingManager();

      carRacingManager.setParticipants("뽀로로, 크롱, 루피");

      expect(carRacingManager.getParticipantsName()).toEqual([
        "뽀로로",
        "크롱",
        "루피",
      ]);
    });

    test("사용자가 잘못된 입력 값을 작성한 경우 프로그램을 종료한다.", () => {
      const carRacingManager = new CarRacingManager();
      const processEnd = jest.fn();

      carRacingManager.gameStart("뽀로로, 크롱크롱크롱, 루피", processEnd);

      expect(processEnd).toBeCalled();
    });
  });

  describe("경주 진행", () => {
    test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
      const { carRacingManager, spyOn } = gameSetUp();

      carRacingManager.printCarAndMove("뽀로로", 3);

      expect(spyOn.log).toBeCalledWith("뽀로로: ---");
    });

    test("자동차 경주는 5회로 고정하여 진행한다.", () => {
      const { gameStart, spyOn } = gameSetUp();

      gameStart();

      expect(spyOn.roundStart).toBeCalledTimes(5);
    });
  });

  describe("우승자 출력", () => {
    test("자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다.", () => {
      const { carRacingManager, gameStart, spyOn } = gameSetUp();

      gameStart();

      expect(spyOn.printGameEndMessage).toBeCalledWith(
        `${carRacingManager.getWinnersName()}가 최종 우승했습니다.`
      );
    });

    test("우승자가 여러 명일 경우 쉼표(,)를 이용하여 구분한다.", () => {
      const carRacingManager = new CarRacingManager();

      const winner = [new CarModel("뽀로로")];
      const winners = [new CarModel("뽀로로"), new CarModel("루피")];

      expect(carRacingManager.getWinnersName(winner)).toBe("뽀로로");
      expect(carRacingManager.getWinnersName(winners)).toBe("뽀로로,루피");
    });
  });
});

function gameSetUp() {
  jest.useFakeTimers();
  const carRacingManager = new CarRacingManager();

  const processEnd = () => {};
  const sleep = () => {};
  const gameStart = () => {
    carRacingManager.gameStart("뽀로로, 크롱, 루피", processEnd, sleep);
    jest.advanceTimersByTime(
      INTERVAL_ROUND_TIME * (CONDITIONS.max_game_round_number + 1)
    );
  };

  const spyOn = {
    printGameEndMessage: jest.spyOn(carRacingManager, "printGameEndMessage"),
    roundStart: jest.spyOn(carRacingManager, "roundStart"),
    log: jest.spyOn(console, "log"),
  };

  return { carRacingManager, gameStart, spyOn };
}
