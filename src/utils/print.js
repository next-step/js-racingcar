import { FORWARD_INDICATOR } from "../contants/racingGame";
import { TOTAL_ROUND_MSG, ROUND_MSG, RESULT_MSG } from "../contants/messages";

export function printGameStart() {
  console.log(TOTAL_ROUND_MSG);
}

export function printCurrentRound(round) {
  console.log(ROUND_MSG(round + 1));
}

export function printCurrentRoundResult(players) {
  players.forEach((player) => {
    console.log(
      `${player.getName()} : ${FORWARD_INDICATOR.repeat(player.getPosition())}`,
    );
  });
  console.log("\n");
}

export function printWinners(winners) {
  const winnerNames = winners.map((winner) => winner.getName()).join(",");
  console.log(RESULT_MSG(winnerNames));
}
