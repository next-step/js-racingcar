import { Cars } from "../src/Models/Cars";
import { Game } from "../src/Models/Game";
import { MoveStrategies } from "../src/Models/MoveStrategy";

const DEFAULT_TOTAL_ROUNDS = 5;
describe("게임 설정 테스트", () => {
  describe("유효하지 않은 값을 입력한 경우", () => {
    it.each(["", null, undefined, " "])(
      "자동차 이름이 빈 값인 경우, 에러를 발생시킨다.",
      (carNamesInput) => {
        expect(() => Game.setGame(carNamesInput, DEFAULT_TOTAL_ROUNDS)).toThrow(
          Game.ERROR_MESSAGE.EMPTY
        );
      }
    );

    it.each(["", null, undefined, " "])(
      "시도 횟수가 빈 값인 경우, 에러를 발생시킨다.",
      (roundsInput) => {
        expect(() => Game.setGame("erica", roundsInput)).toThrow(
          Game.ERROR_MESSAGE.EMPTY
        );
      }
    );

    it.each(["12@", "123456*", "12ab", "abcde", "-12a"])(
      "시도 횟수가 숫자 형태가 아닌 경우, 에러를 발생시킨다.",
      (roundsInput) => {
        expect(() => Game.setGame("erica", roundsInput)).toThrow(
          Game.ERROR_MESSAGE.NOT_NUMBER
        );
      }
    );

    it.each([1.5, 0.5, 1.03])(
      "시도 횟수가 정수가 아닌 경우, 에러를 발생시킨다.",
      (roundsInput) => {
        expect(() => Game.setGame("erica", roundsInput)).toThrow(
          Game.ERROR_MESSAGE.NOT_INTEGER
        );
      }
    );

    it.each([-10, -1, 0])(
      "시도 횟수가 양의 정수가 아닌 경우, 에러를 발생시킨다.",
      (roundsInput) => {
        expect(() => Game.setGame("erica", roundsInput)).toThrow(
          Game.ERROR_MESSAGE.NOT_POSITIVE
        );
      }
    );
  });

  describe("유효한 값을 입력한 경우", () => {
    it.each(["e", "er", "eri", "eric", "erica", "  _", "!!! "])(
      "자동차 이름을 하나만 입력한 경우",
      (userInput) => {
        expect(() =>
          Game.setGame(userInput, DEFAULT_TOTAL_ROUNDS)
        ).not.toThrow();
      }
    );

    it.each([
      "car1, car2, car3",
      "apple, Peach, eGG",
      "12345, aBcDe, !*_",
      "test1, Test2, tEsT1, test2, TeSt1",
      "name1, name2, name3, name4, name5",
    ])("중복 없이 자동차 이름을 여러 개 입력한 경우", (userInput) => {
      expect(() => Game.setGame(userInput, DEFAULT_TOTAL_ROUNDS)).not.toThrow();
    });
  });
});

describe(`게임을 총 ${DEFAULT_TOTAL_ROUNDS}라운드 진행한다.`, () => {
  const CAR_NAMES_INPUT = "erica, Erica, ryang, yang, theon";
  const spyPlayOneRound = jest.spyOn(Cars, "playOneRound");

  beforeAll(() => {
    Game.setGame(CAR_NAMES_INPUT, DEFAULT_TOTAL_ROUNDS);
    Game.playGame(new MoveStrategies("50011"));
  });

  afterAll(() => {
    spyPlayOneRound.mockClear();
  });

  it("각 라운드를 진행하는 함수를 5번 호출한다.", () => {
    expect(spyPlayOneRound).toBeCalledTimes(DEFAULT_TOTAL_ROUNDS);
  });

  it("각 라운드 별 기록을 올바르게 roundHistory에 저장한다.", () => {
    const carNames = CAR_NAMES_INPUT.split(",").map((carName) =>
      carName.trim()
    );
    const expectedRoundHistory = carNames.map((carName) => ({
      name: carName,
      position: 0,
    }));

    const gameResult = Game.getGameResult();

    gameResult.roundHistory.forEach((roundRecord) => {
      expectedRoundHistory[0].position += 1;
      expect(roundRecord).toEqual(expectedRoundHistory);
    });

    expect(gameResult.roundHistory.length).toBe(DEFAULT_TOTAL_ROUNDS);
  });

  it("우승자가 한 명인 경우, 올바른 우승자를 찾는다.", () => {
    expect(Game.getGameResult().winnerNames).toEqual(["erica"]);
  });
});

describe("우승자 판단 테스트", () => {
  const CAR_NAMES_INPUT = "erica, Erica, ryang, yang, theon";

  it("우승자가 한 명인 경우, 올바른 우승자를 반환한다.", () => {
    Game.setGame(CAR_NAMES_INPUT, DEFAULT_TOTAL_ROUNDS);
    Game.playGame(new MoveStrategies("50000"));
    const gameResult = Game.getGameResult();
    expect(gameResult.winnerNames).toEqual(["erica"]);
  });

  it.each(["55000", "55500", "55500", "55550", "55555"])(
    "우승자가 두 명 이상인 경우, 올바른 우승자를 반환한다.",
    (str) => {
      Game.setGame(CAR_NAMES_INPUT, DEFAULT_TOTAL_ROUNDS);
      Game.playGame(new MoveStrategies(str));
      const gameResult = Game.getGameResult();

      const carNames = CAR_NAMES_INPUT.split(",").map((carName) =>
        carName.trim()
      );
      const expectedWinnerNames = carNames.filter(
        (_, index) => str[index] === "5"
      );
      expect(gameResult.winnerNames).toEqual(expectedWinnerNames);
    }
  );
});
