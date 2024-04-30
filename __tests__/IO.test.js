import { playGame } from "../src/controller.js";
import Race from "../src/domain/Race.js";
import { askCarNames } from "../src/view.js";
import Controller from "../src/controller.js";

describe("자동차 이름 입력 구현 테스트", () => {
  test("경주할 자동차를 입력할 때, 이름은 쉼표를 기준으로 구분한다.", () => {
    const race = playGame("pobi,crong,honux");

    const raceCars = race.cars;

    expect(raceCars[0].name).toBe("pobi");
    expect(raceCars[1].name).toBe("crong");
    expect(raceCars[2].name).toBe("honux");
  });
});

describe("사용자가 잘못된 입력 값을 작성한 경우 에러 메시지를 보여준다.", () => {
  test("사용자가 잘못된 자동차 이름을 작성한 경우 에러 메시지를 보여준다.", () => {
    const wrongNameInput = "pobi, crong, honuxi";
    const correctRoundInput = 5;

    expect(() => playGame(wrongNameInput, correctRoundInput)).toThrow(
      "자동차 이름은 5자 이하만 가능합니다."
    );
  });

  test("사용자가 자동차 이름을 작성하지 않은 경우 에러 메시지를 보여준다.", () => {
    expect(() => playGame()).toThrow("자동차 이름을 입력해주세요.");
  });

  test("사용자가 라운드 값을 0이하로 작성한 경우 에러 메시지를 보여준다.", () => {
    const correctNameInput = "pobi, crong, honux";
    const wrongInput = -1;

    expect(() => playGame(correctNameInput, wrongInput)).toThrow(
      "시도할 횟수는 0보다 커야합니다."
    );
  });

  test("사용자가 라운드 값을 string으로 작성한 경우 에러 메시지를 보여준다.", () => {
    const correctNameInput = "pobi, crong, honux";
    const wrongInput = "six";

    expect(() => playGame(correctNameInput, wrongInput)).toThrow(
      "시도할 횟수는 숫자여야합니다."
    );
  });

  test("사용자가 라운드 값을 작성하지 않은 경우 에러 메시지를 보여준다.", () => {
    const correctNameInput = "pobi, crong, honux";

    expect(() => playGame(correctNameInput)).toThrow(
      "시도할 횟수를 입력해주세요."
    );
  });
});

describe("사용자가 잘못된 입력 값을 작성한 경우 다시 입력할 수 있게 한다.", () => {
  test("사용자가 잘못된 자동차 이름을 입력한 경우 다시 자동차 이름을 입력할 수 있게 한다.", async () => {
    //given
    const controller = new Controller();
    const carNameOver5 = "pobi,crong,honuxi";
    const noInput = "";
    const correctCarNames = "pobi,crong,honux";
    const mockAskCarNames = jest.fn();
    mockAskCarNames
      .mockImplementationOnce(() => carNameOver5)
      .mockImplementationOnce(() => noInput)
      .mockImplementationOnce(() => correctCarNames);

    //when
    await controller.initCarNames(mockAskCarNames);

    //then
    expect(mockAskCarNames).toHaveBeenCalledTimes(3);
  });
});
