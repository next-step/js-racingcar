import {
  RacingGame,
  RANDOM_MAX_NUMBER,
  RANDOM_MIN_NUMBER,
} from "../src/RacingGame";
import { RUN_THRESHOLD, RUN_UNIT, START_POSITION } from "../src/Car";
import { getRandomNumberInRange } from "../src/util/getRandomNumber";

const GAME_SIZE = 5;

describe("Single RacingGame (혼자하는 레이싱 게임)", () => {
  const DEFAULT_CAR_NAME = "sonata";
  const RANDOM_NUMBERS = Array.from(new Array(GAME_SIZE), () =>
    getRandomNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER)
  );
  const CAN_GO_ROUNDS = RANDOM_NUMBERS.filter(
    (number) => number >= RUN_THRESHOLD
  ).length;
  const EXPECT_POSITION = START_POSITION + CAN_GO_ROUNDS * RUN_UNIT;
  const EXPECT_POSITION_LOG = `${DEFAULT_CAR_NAME} : ${new Array(
    EXPECT_POSITION
  ).fill("-")}`;
  const EXPECT_WINNER_LOG = `${DEFAULT_CAR_NAME}가 최종 우승했습니다.`;

  let racingGame = new RacingGame(GAME_SIZE, DEFAULT_CAR_NAME);

  it("자동차가 레이싱 게임에 등록했다.", () => {
    expect(racingGame.getPlayer().getName()).toBe(DEFAULT_CAR_NAME);
    expect(racingGame.getPlayer().getPosition()).toBe(START_POSITION);
  });

  it(`${GAME_SIZE}회 동안 자동차가 ${CAN_GO_ROUNDS}번 갈 수 있었을 때, 총 움직인 거리는 ${EXPECT_POSITION}이다.`, () => {
    for (let round = 0; round < GAME_SIZE; round++) {
      racingGame.playOneRound(RANDOM_NUMBERS[round]);
    }
    expect(racingGame.getPlayer().getPosition()).toBe(EXPECT_POSITION);
  });

  it(`${GAME_SIZE}회 동안 자동차가 ${CAN_GO_ROUNDS}번 갈 수 있었을 때, 총 움직인 만큼을 출력 가능한 형태로 표시할 수 있다.`, () => {
    expect(racingGame.getPlayer().getPositionLog()).toBe(EXPECT_POSITION_LOG);
  });

  it(`우승자를 알아낼 수 있다.`, () => {
    expect(racingGame.getWinner().getName()).toBe(DEFAULT_CAR_NAME);
  });

  it(`우승자를 출력 가능한 형태로 표시할 수 있다.`, () => {
    expect(racingGame.getWinnerLog()).toBe(EXPECT_WINNER_LOG);
  });
});
