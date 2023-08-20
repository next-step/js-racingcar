import { CONDITIONS } from "../constants/constants.js";
import GameModel from "./GameModel.js";

const DEFAULT_NAMES = "크롱, 뽀로로, 루피, 포비";
const DEFAULT_TOTAL_ROUND = 4;

describe("GameModel", () => {
  test("게임의 참가는 2대 이상부터 가능하다.", () => {
    expect(() => new GameModel(undefined, 4)).toThrow();
    expect(() => new GameModel("", 4)).toThrow();
    expect(() => new GameModel("11", 4)).toThrow();
    expect(() => new GameModel(DEFAULT_NAMES, 4)).not.toThrow();
  });

  test("중복된 이름으로는 게임에 참여가 불가능하다.", () => {
    expect(
      () => new GameModel([...DEFAULT_NAMES, ...DEFAULT_NAMES], 4),
    ).toThrow();
  });

  test(`전체라운드는 ${CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER}~${CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER}를 가진다`, () => {
    expect(
      () =>
        new GameModel(
          DEFAULT_NAMES,
          CONDITIONS.GAME_MIN_TOTAL_ROUND_NUMBER - 1,
        ),
    ).toThrow();
    expect(
      () =>
        new GameModel(
          DEFAULT_NAMES,
          CONDITIONS.GAME_MAX_TOTAL_ROUND_NUMBER + 1,
        ),
    ).toThrow();
  });

  test("total라운드만큼 게임을 실행한다", () => {
    const game = new GameModel(DEFAULT_NAMES, DEFAULT_TOTAL_ROUND);

    game.play();

    expect(game.currentRound).toBe(DEFAULT_TOTAL_ROUND);
  });
});
