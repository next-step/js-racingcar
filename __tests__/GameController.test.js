import GameController from "../src/GameController";
import { TOTAL_GAME_ROUNDS } from "../src/constants/settings";

// [Phase 1]
describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const NAME = "erica";
  const gameController = new GameController([NAME]);

  it("다섯 라운드가 진행된다.", () => {
    gameController.play();
    expect(gameController.playRoundCalls).toBe(TOTAL_GAME_ROUNDS);
  });

  it("배열 형태로 우승자 정보를 반환한다.", () => {
    expect(gameController.winners).toBeInstanceOf(Array);
  });
});
