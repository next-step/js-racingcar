import { CONDITIONS } from "../constants/constants.js";
import GameModel from "./GameModel.js";

const DEFAULT_NAMES = "크롱, 뽀로로, 루피, 포비";
const DEFAULT_TOTAL_ROUND = 4;

describe("GameModel", () => {
  describe("게임참가", () => {
    const setParticipants = names => () =>
      new GameModel(names, DEFAULT_TOTAL_ROUND);

    const setTotalRound = totalRound => () =>
      new GameModel(DEFAULT_NAMES, totalRound);

    describe("참가자 설정", () => {
      test("이름은 쉼표(,)를 기준으로 구분하여 받는다.", () => {
        const game = setParticipants(DEFAULT_NAMES)();

        expect(game.participants).toHaveLength(4);
      });

      test("게임의 참가는 2명 이상부터 가능하다.", () => {
        expect(setParticipants("크롱, 뽀로로")).not.toThrow();
        expect(setParticipants(DEFAULT_NAMES)).not.toThrow();
      });
    });

    describe("참가자 설정 예외처리", () => {
      test("참가자 없음", () => {
        expect(setParticipants(undefined)).toThrow();
      });

      test("빈 문자열", () => {
        expect(setParticipants("")).toThrow();
      });

      test("한 명의 참가자만 있음", () => {
        expect(setParticipants("크롱")).toThrow();
      });

      test("중복된 이름으로는 게임에 참여가 불가능하다.", () => {
        expect(setParticipants(DEFAULT_NAMES.repeat(2))).toThrow();
      });
    });

    describe("전체라운드 설정", () => {
      test(`전체라운드는 ${CONDITIONS.MIN_GAME_TOTAL_ROUND}~${CONDITIONS.MAX_GAME_TOTAL_ROUND}를 가진다`, () => {
        expect(setTotalRound(CONDITIONS.MIN_GAME_TOTAL_ROUND)).not.toThrow();
        expect(setTotalRound(CONDITIONS.MAX_GAME_TOTAL_ROUND)).not.toThrow();
      });
    });

    describe("전체라운드 설정 예외처리", () => {
      test(`전체라운드가 ${CONDITIONS.MIN_GAME_TOTAL_ROUND}~${CONDITIONS.MAX_GAME_TOTAL_ROUND}을 만족하지 못하면 에러를 던진다`, () => {
        expect(setTotalRound(CONDITIONS.MIN_GAME_TOTAL_ROUND - 1)).toThrow();
        expect(setTotalRound(CONDITIONS.MAX_GAME_TOTAL_ROUND + 1)).toThrow();
      });
    });
  });

  describe("게임 진행", () => {
    test("total라운드만큼 게임을 실행한다", () => {
      const game = new GameModel(DEFAULT_NAMES, DEFAULT_TOTAL_ROUND);

      game.play();

      expect(game.currentRound).toBe(DEFAULT_TOTAL_ROUND);
    });
  });

  describe("게임 우승", () => {
    test("이동거리가 가장 큰 사랑이 우승자가 된다.", () => {
      const records = [
        [
          { name: "뽀로로", movement: 4 },
          { name: "루피", movement: 2 },
          { name: "크롱", movement: 2 },
        ],
      ];
      const game = new GameModel(DEFAULT_NAMES, DEFAULT_TOTAL_ROUND, records);

      expect(game.winners).toEqual([{ name: "뽀로로", movement: 4 }]);
    });

    test("가장 큰 이동거리를 가진 사람이 복수일 경우, 모두 우승자가 된다.", () => {
      const records = [
        [
          { name: "뽀로로", movement: 4 },
          { name: "루피", movement: 2 },
          { name: "크롱", movement: 4 },
        ],
      ];
      const game = new GameModel(DEFAULT_NAMES, DEFAULT_TOTAL_ROUND, records);

      expect(game.winners).toEqual([
        { name: "뽀로로", movement: 4 },
        { name: "크롱", movement: 4 },
      ]);
    });
  });
});
