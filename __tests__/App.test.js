import { app } from "../src/index.js";
import View from "../src/view.js";
import Race from "../src/domain/Race.js";
import Controller from "../src/controller.js";

jest.mock("../src/view.js");
jest.mock("../src/controller.js");

describe("app 함수 통합 테스트", () => {
  beforeEach(() => {
    View.mockClear();
    Controller.mockClear();
  });

  test("app내에서 자동차 경주 초기화 및 플레이 함수를 올바르게 실행하는지 확인", async () => {
    // given
    const mockAskCarNames = jest.fn();
    const mockAskMaxRound = jest.fn();
    const mockInitCarNames = jest.fn();
    const mockInitMaxRound = jest.fn();
    const mockPlayRaceGame = jest.fn();
    const mockFinish = jest.fn();

    View.mockImplementation(() => {
      return {
        askCarNames: mockAskCarNames,
        askMaxRound: mockAskMaxRound,
      };
    });

    Controller.mockImplementation(() => {
      return {
        initCarNames: mockInitCarNames,
        initMaxRound: mockInitMaxRound,
        playRaceGame: mockPlayRaceGame,
        finish: mockFinish,
      };
    });

    const view = new View();
    const race = new Race();
    const controller = new Controller(view, race);

    // when
    await app(view, controller);

    // then
    expect(mockInitCarNames).toHaveBeenCalledWith(mockAskCarNames);
    expect(mockInitMaxRound).toHaveBeenCalledWith(mockAskMaxRound);
    expect(mockInitCarNames).toHaveBeenCalledTimes(1);
    expect(mockInitMaxRound).toHaveBeenCalledTimes(1);
    expect(mockPlayRaceGame).toHaveBeenCalledTimes(1);
    expect(mockFinish).toHaveBeenCalledTimes(1);
  });
});
