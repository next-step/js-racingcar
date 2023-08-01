import RacingGameController from "../src/class/RacingGameController";

describe("RacingCarGame Class 테스트", () => {
  test("validateCarNames에서 에러가 발생하면 에러가 onError에 전달되어야 하며 게임이 종료된다.", async () => {
    const expectedError = new Error("에러 테스트");

    const validateCarNamesTester = () => {
      throw expectedError;
    };

    const handleErrorTester = jest.fn();

    const racingCarGame = new RacingGameController({
      validateCarNames: validateCarNamesTester,
      onError: handleErrorTester,
    });

    const endGameSpy = jest.spyOn(racingCarGame, "endGame");

    const onErrorSpy = jest.spyOn(racingCarGame, "onError");

    await racingCarGame.startGame();

    expect(validateCarNamesTester).toThrow(expectedError);

    expect(onErrorSpy).toHaveBeenCalledWith(expectedError);

    expect(endGameSpy).toHaveBeenCalled();
  });

  test("executeOneRound가 지정한 횟수만큼 호출된다.", async () => {
    const testRoundNumber = 3;

    const racingCarGame = new RacingGameController({
      roundNumber: testRoundNumber,
    });

    const executeMultipleRoundsSpy = jest.spyOn(
      racingCarGame,
      "executeMultipleRounds",
    );

    const executeOneRoundSpy = jest.spyOn(racingCarGame, "executeOneRound");

    await racingCarGame.startGame();

    expect(executeMultipleRoundsSpy).toHaveBeenCalledTimes(1);

    expect(executeOneRoundSpy).toHaveBeenCalledTimes(testRoundNumber);
  });
});
