import Game from "../src/Game";
import {
  INPUT_ERROR_MESSAGE,
  GAME_INIT_ROUND,
  TOTAL_GAME_ROUNDS,
} from "../src/constants/game";

// [Phase 1]

/**
 * 테스트 파일에서 사용하는 공통 상수
 */
const VALID_INPUT = "erica";

describe("[feature1] 사용자가 입력한 값의 유효성을 확인한다.", () => {
  it("사용자가 빈 값을 입력한 경우, 오류를 발생시키며, 프로그램을 종료한다.", () => {
    const INVALID_EMPTY_INPUT = "";
    expect(() => new Game(INVALID_EMPTY_INPUT)).toThrow(
      INPUT_ERROR_MESSAGE.EMPTY_INPUT
    );
  });

  it("유효한 입력값이라면 정상 동작한다.", () => {
    const VALID_INPUT = "erica";
    expect(() => new Game(VALID_INPUT)).not.toThrow();
  });
});

describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const game = new Game(VALID_INPUT);

  // TODO 테스트코드 체크. 배열 구성 내용까지?
  it("게임 컨트롤러는 Car 객체를 갖는 배열, View 객체, 현재 라운드, 우승자 배열을 상태값으로 갖는다.", () => {
    expect(game.cars).toBeInstanceOf(Array);
    expect(game.currRound).toBeDefined();
    expect(game.currRound).toBe(GAME_INIT_ROUND);
    expect(game.winners).toBeInstanceOf(Array);
  });

  it("다섯 라운드가 진행된다.", () => {
    game.play();
    expect(game.playRoundCalls).toBe(TOTAL_GAME_ROUNDS);
  });

  it("배열 형태로 우승자 정보를 반환한다.", () => {
    expect(game.winners).toBeInstanceOf(Array);
  });
});
