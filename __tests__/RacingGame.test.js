import RacingGame from "../src/class/RacingGame";

describe("RacingGame Class 테스트", () => {
  test("0~9 이외의 문자가 포함된 라운드를 입력시 에러가 발생한다.", () => {
    const racingGame = new RacingGame();

    const testRoundNumber = "-0.1";

    expect(() => {
      racingGame.roundNumber = testRoundNumber;
    }).toThrowError("양의 정수 형식의 값을 입력해 주세요.");
  });

  test("0을 입력시 에러가 발생한다", () => {
    const racingGame = new RacingGame();

    const testRoundNumber = "0";

    expect(() => {
      racingGame.roundNumber = testRoundNumber;
    }).toThrowError("1이상 값을 입력해주세요.");
  });

  test("setRoundNumber로 roundNumber가 갱신되며 executeMultipleRound 실행후 currentRound는 지정한 roundNumber보다 1 큰 값이다.", () => {
    const testRoundNumber = 3;

    const racingGame = new RacingGame();

    racingGame.roundNumber = testRoundNumber;

    racingGame.executeMultipleRounds();

    expect(racingGame.currentRound).toBe(testRoundNumber + 1);
  });
});
