import { createGame } from "../src/Models/Game";
import {
  CarNamesIsEmptyError,
  TotalRoundsNotNumberError,
  TotalRoundsNotIntegerError,
  TotalRoundsNotPositiveError,
  TotalRoundsIsEmptyError,
} from "../src/Models/Game/errors";
import MoveStrategies from "../test/MoveStrategies";

describe("게임 설정 테스트", () => {
  const { setGame } = createGame();
  describe("유효하지 않은 값을 입력한 경우", () => {
    describe("carNames가 빈 값이면, 에러를 발생시킨다.", () => {
      it.each(["", null, undefined, " "])("%p", (carNamesInput) => {
        expect(() => setGame(carNamesInput, 5)).toThrow(CarNamesIsEmptyError);
      });
    });

    describe("totalRounds가 빈 값이면, 에러를 발생시킨다.", () => {
      it.each(["", null, undefined, " "])(
        "시도 횟수가 빈 값인 경우, 에러를 발생시킨다.",
        (roundsInput) => {
          expect(() => setGame("erica", roundsInput)).toThrow(
            TotalRoundsIsEmptyError
          );
        }
      );
    });

    describe("totalRounds가 숫자 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each(["12@", "123456*", "12ab", "abcde", "-12a"])(
        "%p",
        (roundsInput) => {
          expect(() => setGame("erica", roundsInput)).toThrow(
            TotalRoundsNotNumberError
          );
        }
      );
    });

    describe("totalRounds가 정수 형태가 아니면, 에러를 발생시킨다.", () => {
      it.each([1.5, 0.5, 1.03])("%p", (roundsInput) => {
        expect(() => setGame("erica", roundsInput)).toThrow(
          TotalRoundsNotIntegerError
        );
      });
    });

    describe("totalRounds가 양의 정수가 아니면, 에러를 발생시킨다.", () => {
      it.each([-10, -1, 0])("%p", (roundsInput) => {
        expect(() => setGame("erica", roundsInput)).toThrow(
          TotalRoundsNotPositiveError
        );
      });
    });
  });

  describe("유효한 값을 입력한 경우", () => {
    describe("자동차 이름을 하나만 입력한 경우, 에러를 발생시키지 않는다.", () => {
      it.each(["e", "er", "eri", "eric", "erica", "  _", "!!! "])(
        "%p",
        (userInput) => {
          expect(() => setGame(userInput, 5)).not.toThrow();
        }
      );
    });

    describe("중복없이 자동차 이름을 여러개 입력한 경우, 에러를 발생시키지 않는다.", () => {
      it.each([
        "car1, car2, car3",
        "apple, Peach, eGG",
        "12345, aBcDe, !*_",
        "test1, Test2, tEsT1, test2, TeSt1",
        "name1, name2, name3, name4, name5",
      ])("%p", (userInput) => {
        expect(() => setGame(userInput, 5)).not.toThrow();
      });
    });
  });
});

describe("playGame() 테스트", () => {
  const { setGame, playGame, getGameResult } = createGame();
  describe("게임을 총 5라운드 진행한다.", () => {
    setGame("erica, Erica, ryang, yang, theon", 5);
    playGame(new MoveStrategies("50011"));
    const gameResult = getGameResult();

    it("게임을 총 5라운드 진행한다.", () => {
      expect(gameResult.roundHistory.length).toBe(5);
    });

    it("각 라운드 별 기록을 올바르게 roundHistory에 저장한다.", () => {
      gameResult.roundHistory.forEach((roundRecord, idx) => {
        expect(roundRecord).toEqual([
          { name: "erica", position: idx + 1 },
          { name: "Erica", position: 0 },
          { name: "ryang", position: 0 },
          { name: "yang", position: 0 },
          { name: "theon", position: 0 },
        ]);
      });
    });
  });
});

describe("getGameResult() 테스트", () => {
  describe("올바른 우승자를 반환한다.", () => {
    const { setGame, playGame, getGameResult } = createGame();
    it.each([
      {
        strategies: "50000",
        winnerNames: ["erica"],
        winnerCount: 1,
      },
      {
        strategies: "55000",
        winnerNames: ["erica", "Erica"],
        winnerCount: 2,
      },
      {
        strategies: "55500",
        winnerNames: ["erica", "Erica", "ryang"],
        winnerCount: 3,
      },
      {
        strategies: "55550",
        winnerNames: ["erica", "Erica", "ryang", "yang"],
        winnerCount: 4,
      },
      {
        strategies: "55555",
        winnerNames: ["erica", "Erica", "ryang", "yang", "theon"],
        winnerCount: 5,
      },
    ])("winnerNames: $winnerNames", ({ winnerNames, strategies }) => {
      setGame("erica, Erica, ryang, yang, theon", 5);
      playGame(new MoveStrategies(strategies));
      expect(getGameResult().winnerNames).toEqual(winnerNames);
    });
  });

  describe("게임 기록과 우승자 정보를 반환한다.", () => {
    const { setGame, playGame, getGameResult } = createGame();
    setGame("erica, Erica, ryang, yang, theon", 5);
    playGame(new MoveStrategies("50011"));
    const gameResult = getGameResult();
    gameResult.roundHistory.forEach((roundRecord, idx) => {
      expect(roundRecord).toEqual([
        { name: "erica", position: idx + 1 },
        { name: "Erica", position: 0 },
        { name: "ryang", position: 0 },
        { name: "yang", position: 0 },
        { name: "theon", position: 0 },
      ]);
    });
    expect(gameResult.winnerNames).toEqual(["erica"]);
  });
});
