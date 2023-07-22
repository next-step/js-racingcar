import * as readline from "readline";
import RacingCarGame from "../src/class/RacingCarGame";
import { EventEmitter } from "stream";
import { ERROR_MESSAGES } from "../src/class/RacingCarGame";

jest.mock("readline");

function initiallizeTestEnvironment() {
  const questionSpy = jest.fn();
  const closeSpy = jest.fn();
  const consoleLogSpy = jest.spyOn(console, "log");

  readline.createInterface.mockReturnValue({
    question: questionSpy,
    close: closeSpy,
    input: new EventEmitter(),
    output: new EventEmitter(),
    write: jest.fn(),
  });

  const racingCarGame = new RacingCarGame();

  return { questionSpy, racingCarGame, closeSpy, consoleLogSpy };
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

  test("자동차 이름에 빈값을 입력할 경우 에러 문구와 함께 게임이 종료된다.", () => {
    const { racingCarGame, closeSpy, consoleLogSpy } =
      initiallizeTestEnvironment();

    readline
      .createInterface()
      .question.mockImplementationOnce((_, callback) => callback(""));

    racingCarGame.startGame();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      ERROR_MESSAGES.INVALID_EMPTY_NAME
    );

    expect(closeSpy).toHaveBeenCalledTimes(1);

    consoleLogSpy.mockRestore();
  });

  test("여러 자동차 이름에 빈값이 포함되어 있는 경우 에러 문구와 함께 게임이 종료된다.", () => {
    const { racingCarGame, closeSpy, consoleLogSpy } =
      initiallizeTestEnvironment();

    readline
      .createInterface()
      .question.mockImplementationOnce((_, callback) =>
        callback("pobi,  ,conan")
      );

    racingCarGame.startGame();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      ERROR_MESSAGES.INVALID_EMPTY_NAME
    );

    expect(closeSpy).toHaveBeenCalledTimes(1);

    consoleLogSpy.mockRestore();
  });

  test("여러 자동차 이름에 5자가 넘는 자동차 이름이 포함되어 있는 경우 에러 문구와 함께 게임이 종료된다.", () => {
    const { racingCarGame, closeSpy, consoleLogSpy } =
      initiallizeTestEnvironment();

    readline
      .createInterface()
      .question.mockImplementationOnce((_, callback) =>
        callback("1234567,pobi,conan")
      );

    racingCarGame.startGame();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      ERROR_MESSAGES.INVALID_NAME_LENGTH
    );

    expect(closeSpy).toHaveBeenCalledTimes(1);

    consoleLogSpy.mockRestore();
  });

  test("중복된 자동차 이름이 포함되어 있는 경우 에러 문구와 함께 게임이 종료된다.", () => {
    const { racingCarGame, closeSpy, consoleLogSpy } =
      initiallizeTestEnvironment();

    readline
      .createInterface()
      .question.mockImplementationOnce((_, callback) =>
        callback("pobi,pobi,conan")
      );

    racingCarGame.startGame();

    expect(consoleLogSpy).toHaveBeenCalledWith(
      ERROR_MESSAGES.DUPLICATE_CAR_NAME
    );

    expect(closeSpy).toHaveBeenCalledTimes(1);

    consoleLogSpy.mockRestore();
  });

  test("정상적인 자동차 이름 입력시 cars에 정보가 저장된다.(settingCars 메소드 테스트)", () => {
    const { racingCarGame } = initiallizeTestEnvironment();

    racingCarGame.settingCars(['pobi','crong','honux'])

    const expectedCars = new Map();

    expectedCars.set("pobi", { distance: 0 });

    expectedCars.set("crong", { distance: 0 });

    expectedCars.set("honux", { distance: 0 });

    expect(racingCarGame.cars).toEqual(expectedCars)

  });
});
