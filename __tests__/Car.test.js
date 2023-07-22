import * as readline from "readline";
import RacingCarGame from "../src/class/RacingCarGame";

jest.mock("readline");

function initiallizeTestEnvironment() {
  const questionSpy = jest.fn();
  const closeSpy = jest.fn();

  readline.createInterface.mockReturnValue({
    question: questionSpy,
    close: closeSpy,
  });

  const racingCarGame = new RacingCarGame();

  return { questionSpy, racingCarGame, closeSpy };
}

describe("레이싱 경주 시작 및 자동차 이름 입력", () => {
  test("레이싱 경주 시작시 안내문구가 콘솔에 표시된다", () => {
    const { racingCarGame, questionSpy } = initiallizeTestEnvironment();

    racingCarGame.startGame();

    expect(questionSpy).toHaveBeenCalledWith(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
      expect.anything()
    );
  });

  test("endGame 메소드 호출 시 경주가 정상적으로 종료된다.", () => {
    const { racingCarGame, closeSpy } = initiallizeTestEnvironment();

    racingCarGame.startGame();

    racingCarGame.endGame();

    expect(closeSpy).toHaveBeenCalled();
  });
});
