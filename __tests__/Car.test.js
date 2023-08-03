import RacingGameController from "../src/class/RacingGameController";
import RacingGameViewer from "../src/class/RacingGameViewer";
import Car from "../src/class/Car";

describe("RacingCarGameController Class 테스트", () => {
  test("자동차 이름 중 빈값인 자동차가 포함되면 에러가 발생한다.", () => {
    const racingCarGame = new RacingGameController({
      view: new RacingGameViewer(),
      model: new Car(),
    });

    expect(() => racingCarGame.validateCarNames(["", "테스트"])).toThrowError(
      "자동차 이름은 빈값일 수 없습니다.",
    );
  });

  test("자동차 이름 중 6자 이상인 자동차가 있으면 에러가 발생한다.", async () => {
    const racingCarGame = new RacingGameController({
      view: new RacingGameViewer(),
      model: new Car(),
    });

    expect(() =>
      racingCarGame.validateCarNames(["테스트", "123456"]),
    ).toThrowError("자동차 이름은 5자를 넘길 수 없습니다.");
  });

  test("자동차 이름 중 같은 이름의 자동차가 있으면 에러가 발생한다.", async () => {
    const racingCarGame = new RacingGameController({
      view: new RacingGameViewer(),
      model: new Car(),
    });

    expect(() =>
      racingCarGame.validateCarNames(["테스트", "테스트"]),
    ).toThrowError("자동차 이름은 중복될 수 없습니다.");
  });

  test("executeOneRound가 지정한 횟수만큼 호출된다.", async () => {
    const testRoundNumber = 3;

    const racingCarGame = new RacingGameController({
      roundNumber: testRoundNumber,
      view: new RacingGameViewer(),
      model: new Car(),
    });

    const executeMultipleRoundsSpy = jest.spyOn(
      racingCarGame,
      "executeMultipleRounds",
    );

    const executeOneRoundSpy = jest.spyOn(racingCarGame, "executeOneRound");

    racingCarGame.executeMultipleRounds();

    expect(executeMultipleRoundsSpy).toHaveBeenCalledTimes(1);

    expect(executeOneRoundSpy).toHaveBeenCalledTimes(testRoundNumber);
  });

  test("사용자가 입력한 이동횟수(유효한 경우)로 roundNumber가 갱신된다.", () => {
    const testRoundNumber = 3;

    const racingCarGame = new RacingGameController({
      view: new RacingGameViewer(),
      model: new Car(),
    });

    racingCarGame.setRoundNumber(testRoundNumber);

    expect(racingCarGame.getRoundNumber()).toEqual(testRoundNumber);
  });
});
