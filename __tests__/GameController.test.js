import GameController from "../src/GameController";
import { GAME_INIT_ROUND, TOTAL_GAME_ROUNDS } from "../src/constants/settings";

// [Phase 1]
describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const NAME = "erica";
  const gameController = new GameController([NAME]);

  // TODO 테스트코드 체크. 배열 구성 내용까지?
  it("게임 컨트롤러는 Car 객체를 갖는 배열, View 객체, 현재 라운드, 우승자 배열을 상태값으로 갖는다.", () => {
    expect(gameController.cars).toBeInstanceOf(Array);
    expect(gameController.view).toBeDefined();
    expect(gameController.currRound).toBeDefined();
    expect(gameController.currRound).toBe(GAME_INIT_ROUND);
    expect(gameController.winners).toBeInstanceOf(Array);
  });

  it("다섯 라운드가 진행된다.", () => {
    gameController.play();
    expect(gameController.playRoundCalls).toBe(TOTAL_GAME_ROUNDS);
  });

  it("배열 형태로 우승자 정보를 반환한다.", () => {
    expect(gameController.winners).toBeInstanceOf(Array);
  });
});
