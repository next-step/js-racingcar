import { CONSOLE_MESSAGES } from "../constants/messages";
import { Console } from "../utils/console";

export const output = {
  raceResultTitle() {
    Console.print(CONSOLE_MESSAGES.RACE_RESULT);
  },

  carPosition(car) {
    Console.print(CONSOLE_MESSAGES.CAR_POSITION(car));
  },

  carRaceResult(result) {
    result.map(round => {
      round.map(car => this.carPosition(car));
      Console.print("");
    });
  },

  winner(winner) {
    const winnerWithComma = winner.map(car => car.name).join(", ");
    Console.print(CONSOLE_MESSAGES.WINNER(winnerWithComma));
    Console.exit();
  },
};
