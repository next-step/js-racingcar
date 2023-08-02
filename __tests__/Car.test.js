import GameTrack from "../src/model/GameTrack";
import RacingCarGameController from "../src/controller/RacingCarGameController";
import GameWinners from "../src/model/GameWinners";
import { isValidInputLength } from "../src/model/validator";

const newGame = new RacingCarGameController();
const gameTrack = new GameTrack();
const gameWinners = new GameWinners();

const DEFAULT_SCORE = "-";

gameTrack.gameStatus = [
  { carName: "kim", forward: "--" },
  { carName: "vs", forward: "-" },
  { carName: "frank", forward: "----" },
  { carName: "myself", forward: "----" },
];

describe("자동차 이름 입력", () => {
  test("이름은 빈값이 아니고, 1~5자만 가능한지 확인한다.", () => {
    const validCarName = "Frank";
    const validCarNames = ["kim", "lee", "frank", "a", "b"];
    const invalidCarNames = ["bmw", "tesla!", "frank"];
    const invalidEmptyNames = ["kimkim", ""];
    const invalidEmptyName = null;

    // 하나라도 실패하면 toBeFalsy()가 true를 반환
    const validCarNameResult = isValidInputLength(validCarName);
    const invalidEmptyNameResult = isValidInputLength(invalidEmptyName);

    const validCarNamesResult = validCarNames.every(carName =>
      isValidInputLength(carName)
    );
    const invalidCarNamesResult = invalidCarNames.every(carName =>
      isValidInputLength(carName)
    );
    const invalidEmptyNamesResult = invalidEmptyNames.every(carName =>
      isValidInputLength(carName)
    );

    expect(validCarNameResult).toBeTruthy();
    expect(invalidEmptyNameResult).toBeFalsy();

    expect(validCarNamesResult).toBeTruthy();
    expect(invalidCarNamesResult).toBeFalsy();
    expect(invalidEmptyNamesResult).toBeFalsy();
  });

  test("중복된 이름이 있으면 isValidCarDuplicateName()은 true를 반환한다.", () => {
    const result = gameTrack.isValidCarDuplicateName("frank");
    expect(result).toBeTruthy();
  });

  test("중복된 이름이 없으면 isValidCarDuplicateName()은 false를 반환한다.", () => {
    const result = gameTrack.isValidCarDuplicateName("2");
    expect(result).toBeFalsy();
  });
});

describe("RacingCarGameController 컨트롤러 로직", () => {
  test("DEFAULT_SCORE 세팅이 맞는지 확인한다.", () => {
    newGame.setForwardScoreIcon(DEFAULT_SCORE);
    expect(newGame.forwardScoreIcon).toBe(DEFAULT_SCORE);
  });

  test("DEFAULT SCORE가 많은 아이가 우승자다.", () => {
    const winners = gameWinners.setGameWinners(gameTrack.gameStatus);
    expect(winners).toEqual(["frank", "myself"]);
  });
});
