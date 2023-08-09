import { RacingGame } from "./RacingGame";
import {
  MIN_GAME_SIZE,
} from "./RacingGame.const";
import {
  START_POSITION,
} from "../Car/Car.const";
import {
  CAN_GO_ROUNDS,
  DEFAULT_CAR_NAMES_INPUT,
  DEFAULT_GAME_SIZE,
  DEFAULT_PLAYERS, EXPECT_POSITION_LOGS,
  EXPECT_POSITIONS, EXPECT_WINNERS, RANDOM_NUMBERS_ALL
} from "./RacingGame.test.const";

describe("Together RacingGame (여럿이서 하는 레이싱 게임)", () => {
  let racingGame = new RacingGame();
  racingGame.setRacingGameSize(DEFAULT_GAME_SIZE);


  context('자동차 게임 시도 횟수를 입력받았을 때', () => {
    it(`양의 정수가 아닌 값이 입력됐을 경우 에러를 출력하고 게임을 종료한다.`, () => {
      expect(() => racingGame.setRacingGameSize('abc')).toThrow(`레이싱 게임 시도 회수를 숫자로 제대로 입력해야합니다.`);
    })

    it(`입력한 시도 횟수가 0 미만이면 에러를 출력하고 게임을 종료한다.`, () => {
      expect(() => racingGame.setRacingGameSize(-1)).toThrow(`레이싱 게임 시도 회수는 ${MIN_GAME_SIZE} 이상이어야 합니다.`);
    })
  })

  context(`"${DEFAULT_CAR_NAMES_INPUT}"가 레이싱 게임에 등록했을 때`, () => {
    it(`등록된 자동차는 총 ${DEFAULT_PLAYERS.length}대 이다.`, () => {
      racingGame.setPlayers(
          racingGame.getPlayerNamesFromInput(DEFAULT_CAR_NAMES_INPUT)
      );
      const expectedPlayersNames = DEFAULT_PLAYERS.map((player) =>
          player.getName()
      );
      const receivedPlayersNames = racingGame
          .getPlayers()
          .map((player) => player.getName());
      expect(receivedPlayersNames).toStrictEqual(expectedPlayersNames);
    });
  })


  describe("자동차 경주 진행 중", () => {
    DEFAULT_PLAYERS.forEach((_, playerIdx) => {
      context(`${START_POSITION}에서 시작해서 ${DEFAULT_GAME_SIZE}회 동안 자동차가 ${CAN_GO_ROUNDS[playerIdx]}번 갈 수 있었을 때`, () => {
        it(`최종적으로 도착한 위치는 ${EXPECT_POSITIONS[playerIdx]}이다.`, () => {
          for (let round = 0; round < DEFAULT_GAME_SIZE; round++) {
            racingGame.playerPlayOneRound(
                playerIdx,
                RANDOM_NUMBERS_ALL[playerIdx][round]
            );
          }
          expect(racingGame.getPlayers()[playerIdx].getPosition()).toBe(
              EXPECT_POSITIONS[playerIdx]
          );
        });
      })
    });

    racingGame.getPlayers().forEach((player, playerIdx) => {
      context(`${DEFAULT_GAME_SIZE}회 동안 자동차가 ${CAN_GO_ROUNDS[playerIdx]}번 갈 수 있었을 때,`, () => {
        it(`총 움직인 만큼을 출력 가능한 형태로 표시할 수 있다.`, () => {
          expect(player.getPositionLog()).toBe(EXPECT_POSITION_LOGS[playerIdx]);
        });
      });
    });
  });

  describe("자동차 경주 완료", () => {
    context(`제일 멀리 간 플레이어가 ${EXPECT_WINNERS.join(", ")}일 때`, () => {
      it(`우승자는 ${EXPECT_WINNERS.join(", ")}이다.`, () => {
        expect(racingGame.getWinnersNames()).toStrictEqual(EXPECT_WINNERS);
      });
    });
  });
});
