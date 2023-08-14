import { Cars } from "../src/Models/Cars";
import { Game } from "../src/Models/Game";
import { FixedStrategy } from "../src/Models/MoveStrategy";

const DEFAULT_TOTAL_ROUNDS = 5;
describe("사용자가 유효한 값을 입력한 경우, 게임을 세팅한다.", () => {
  it.each(["", null, undefined, " "])(
    "자동차 이름들이 빈 값인 경우, 에러를 발생시킨다.",
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

  describe("사용자가 유효한 값을 입력하면, 에러를 발생시키지 않는다.", () => {
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

describe(`게임을 총 ${DEFAULT_TOTAL_ROUNDS}라운드를 진행하고, 게임 결과를 반환한다.`, () => {
  Game.setGame("hyun, ja, yeo, yang, erica, star", DEFAULT_TOTAL_ROUNDS);
  const spyPlayOneRound = jest.spyOn(Cars, "playOneRound");
  Game.playGame();

  describe(`게임은 총 ${DEFAULT_TOTAL_ROUNDS}라운드를 진행한다.`, () => {
    it("각 라운드를 진행하는 함수를 5번 호출한다.", () => {
      expect(spyPlayOneRound).toBeCalledTimes(DEFAULT_TOTAL_ROUNDS);
    });

    it("각 라운드 별 기록을 roundHistory에 저장한다.", () => {
      expect(Game.getGameResult().roundHistory.length).toBe(
        DEFAULT_TOTAL_ROUNDS
      );
    });
  });

  describe(`${DEFAULT_TOTAL_ROUNDS} 라운드의 게임 기록과 우승자 정보를 반환한다.`, () => {
    it(`${DEFAULT_TOTAL_ROUNDS} 라운드의 게임 기록을 반환한다.`, () => {
      expect(Game.getGameResult().roundHistory.length).toBe(
        DEFAULT_TOTAL_ROUNDS
      );
    });

    it("라운드 게임 기록은 Car의 이름과 위치를 저장한 객체 배열 형태이다.", () => {
      const roundRecord = Game.getGameResult().roundHistory[0];
      roundRecord.forEach((carRecord) => {
        expect(carRecord).toHaveProperty("name");
        expect(carRecord).toHaveProperty("position");
      });
    });

    // CHECK 우승자 정보가 정확한지 체크하는 테스트 코드 작성
    it("올바른 우승자 정보를 반환한다.", () => {
      Game.setGame("erica, gong", 2);
    });
  });
});
