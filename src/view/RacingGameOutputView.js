import {Console} from "../util/Console";

class RacingGameOutputView {

    printGameResultHeader() {
        Console.print("\n실행 결과");
    }
    printOneRoundGameResult(players) {
        const result = players
            .map((player) => player.getPositionLog())
            .join("\n");
        Console.print(result, "\n");
    }

    printWinnerLog(winnerNames) {
        Console.print(`${winnerNames.join(", ")}가 최종 우승했습니다.`);
    }
}

export default RacingGameOutputView