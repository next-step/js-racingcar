import * as readline from "readline";
import RacingCarGame from "../src/class/RacingCarGame";

jest.mock("readline");

describe("자동차 이름을 입력받는 안내문구를 표시하고 입력 받는다.", () => {
  let questionSpy;
  let racingCarGame;

  beforeEach(() => {
    questionSpy = jest.fn();
    readline.createInterface.mockReturnValue({
      question: questionSpy,
      close: jest.fn(),
    });

    racingCarGame = new RacingCarGame();
  });

  test("레이싱 경주 시작시 안내문구가 콘솔에 표시된다", () => {
    racingCarGame.startGame();

    expect(questionSpy).toHaveBeenCalledWith(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
      expect.anything()
    );
  });
});
