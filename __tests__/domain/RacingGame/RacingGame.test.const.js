import {Car} from "../../../src/domain/Car/Car";
import {getRandomNumberInRange} from "../../../src/util/getRandomNumber";
import {RANDOM_MAX_NUMBER, RANDOM_MIN_NUMBER} from "../../../src/domain/RacingGame/RacingGame.const";
import {RUN_THRESHOLD, RUN_UNIT, START_POSITION} from "../../../src/domain/Car/Car.const";

// 테스트 때 할당할 게임 기본 사이즈
export const DEFAULT_GAME_SIZE = 5;

// 테스트 때 할당할 게임 기본 플레이어 이름 정보
export const DEFAULT_CAR_NAMES_INPUT = "pobi,crong,honux";

// 생성한 게임 플레이어 리스트
export const DEFAULT_PLAYERS = [new Car("pobi"), new Car("crong"), new Car("honux")];

// [플레이어][게임 회차]에 할당된 랜덤한 숫자들
export const RANDOM_NUMBERS_ALL = Array.from(new Array(DEFAULT_PLAYERS.length), () =>
    Array.from(new Array(GAME_SIZE), () =>
        getRandomNumberInRange(RANDOM_MIN_NUMBER, RANDOM_MAX_NUMBER)
    )
);

// [플레이어]마다 전진할 수 있는 총 라운드 수
export const CAN_GO_ROUNDS = RANDOM_NUMBERS_ALL.map(
    (RANDOM_NUMBERS) =>
        RANDOM_NUMBERS.filter((number) => number >= RUN_THRESHOLD).length
);

// [플레이어]가 게임 끝났을 때 기대되는 도달해있는 위치
export const EXPECT_POSITIONS = CAN_GO_ROUNDS.map(
    (CAN_GO_ROUND) => START_POSITION + CAN_GO_ROUND * RUN_UNIT
);

// [플레이어]가 게임 끝났을 때 실제 도달해있는 위치
export const EXPECT_GAME_RESULT = DEFAULT_PLAYERS.map(
    (player, i) => new Car(player.getName(), EXPECT_POSITIONS[i])
);

// [플레이어]마다 최종에 기대되는 게임 진행상황
export const EXPECT_POSITION_LOGS = EXPECT_GAME_RESULT.map((player) =>
    player.getPositionLog()
);

// 우승자의 위치
const _WINNER_POSITION = Math.max(...EXPECT_POSITIONS);

// 우승자 이름만 있는 배열
export const EXPECT_WINNERS = EXPECT_GAME_RESULT.filter(
    (player) => player.getPosition() === _WINNER_POSITION
).map((player) => player.getName());

// 게임 끝났을 때 기대되는 결과
export const EXPECT_WINNER_LOG = `${EXPECT_WINNERS.join(",")}가 최종 우승했습니다.`;