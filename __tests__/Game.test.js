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
  it.each([
    { name: "빈 값", input: "", expected: INPUT_ERROR_MESSAGE.EMPTY_INPUT },
    {
      name: "중복된 자동차 이름이 있는 값",
      input: "a,b,c,a",
      expected: INPUT_ERROR_MESSAGE.DUPLICATE_CAR_NAME,
    },
  ])(
    `사용자 입력이 $name인 경우, 에러를 발생시킨다.`,
    ({ input, expected }) => {
      expect(() => new Game(input)).toThrow(expected);
    }
  );

  it("유효한 입력값이라면 정상 동작한다.", () => {
    expect(() => new Game(VALID_INPUT)).not.toThrow();
  });
});

describe("[feature4] 총 5라운드를 반복하고, 우승 자동차 정보를 반환한다.", () => {
  const game = new Game(VALID_INPUT);

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
