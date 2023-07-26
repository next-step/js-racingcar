import RacingCarGame from "../src/class/RacingCarGame";

describe("RacingCarGame Class 테스트", () => {
  test("RacingCarGame 선언시 주입하는 값이 올바른 속성에 할당되어야 한다.", () => {
    const roundNumberTester = 1;
    const handleGameStartTester = () => {
      return new Promise((resolve) => resolve([]));
    };
    const handleGameEndTester = () => {};
    const handleMultipleRoundStartTester = () => {};
    const handleMultipleRoundEndTester = () => {};
    const handleSingleRoundStartTester = () => {};
    const handleSingleRoundEndTester = () => {};
    const checkForAdvanceTester = () => {};
    const validateCarNamesTester = () => {};
    const handleErrorTester = () => {};

    const racingCarGame = new RacingCarGame({
      roundNumber: roundNumberTester,
      onGameStart: handleGameStartTester,
      onGameEnd: handleGameEndTester,
      onMultipleRoundStart: handleMultipleRoundStartTester,
      onMultipleRoundEnd: handleMultipleRoundEndTester,
      onSingleRoundStart: handleSingleRoundStartTester,
      onSingleRoundEnd: handleSingleRoundEndTester,
      onError: handleErrorTester,
      checkForAdvance: checkForAdvanceTester,
      validateCarNames: validateCarNamesTester,
    });

    expect(racingCarGame.roundNumber).toBe(roundNumberTester);
    expect(racingCarGame.onGameStart).toBe(handleGameStartTester);
    expect(racingCarGame.onGameEnd).toBe(handleGameEndTester);
    expect(racingCarGame.onMultipleRoundStart).toBe(
      handleMultipleRoundStartTester
    );
    expect(racingCarGame.onMultipleRoundEnd).toBe(handleMultipleRoundEndTester);
    expect(racingCarGame.onSingleRoundStart).toBe(handleSingleRoundStartTester);
    expect(racingCarGame.onSingleRoundEnd).toBe(handleSingleRoundEndTester);
    expect(racingCarGame.onError).toBe(handleErrorTester);
    expect(racingCarGame.checkForAdvance).toBe(checkForAdvanceTester);
    expect(racingCarGame.validateCarNames).toBe(validateCarNamesTester);
  });

  test("validateCarNames에서 발생하는 에러가 onError에 전달되어야 한다.", async () => {
    const expectedError = new Error("에러 테스트");

    const validateCarNamesTester = () => {
      throw expectedError;
    };

    const handleErrorTester = jest.fn();

    const racingCarGame = new RacingCarGame({
      validateCarNames: validateCarNamesTester,
      onError: handleErrorTester,
    });

    await racingCarGame.startGame();

    expect(validateCarNamesTester).toThrow(expectedError);

    expect(racingCarGame.onError).toHaveBeenCalledWith(expectedError);
  });
});
