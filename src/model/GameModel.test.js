import { CONDITIONS } from "../constants/constants.js";
import GameModel from "./GameModel.js";

const DEFAULT_NAMES = "크롱, 뽀로로, 루피, 포비";
const DEFAULT_TOTAL_ROUND = 4;

describe("GameModel", () => {
  describe("name", () => {
    const setParticipants = names => () =>
      new GameModel(names, DEFAULT_TOTAL_ROUND);

    test("이름은 쉼표(,)를 기준으로 구분하여 받는다.", () => {
      const game = setParticipants(DEFAULT_NAMES)();

      expect(game.participants).toHaveLength(4);
    });

    test("게임의 참가는 2대 이상부터 가능하다.", () => {
      expect(setParticipants(undefined)).toThrow();
      expect(setParticipants("")).toThrow();
      expect(setParticipants("크롱")).toThrow();
      expect(setParticipants("크롱, 뽀로로")).not.toThrow();
      expect(setParticipants(DEFAULT_NAMES)).not.toThrow();
    });

    test("중복된 이름으로는 게임에 참여가 불가능하다.", () => {
      expect(setParticipants(DEFAULT_NAMES.repeat(2))).toThrow();
    });
  });

  test(`전체라운드는 ${CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER}~${CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER}를 가진다`, () => {
    const setTotalRound = totalRound => () =>
      new GameModel(DEFAULT_NAMES, totalRound);

    expect(setTotalRound(CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER - 1)).toThrow();
    expect(setTotalRound(CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER)).not.toThrow();
    expect(setTotalRound(CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER)).not.toThrow();
    expect(setTotalRound(CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER + 1)).toThrow();
  });

  test("total라운드만큼 게임을 실행한다", () => {
    const game = new GameModel(DEFAULT_NAMES, DEFAULT_TOTAL_ROUND);

    game.play();

    expect(game.currentRound).toBe(DEFAULT_TOTAL_ROUND);
  });
});
