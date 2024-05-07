import { Race } from "./domain";
import { RandomMoveStrategy } from "./domain/strategies";
import { View } from "./views";

export class App {
  async play() {
    try {
      const carNames = await View.getCarNamesPrompt();
      const raceRound = await View.getRaceRoundPrompt();

      const race = new Race(carNames, raceRound);
      const raceResult = race.race(new RandomMoveStrategy());
      View.printRoundStart();
      raceResult.forEach((result) => {
        View.printRaceResult(result.cars);
      });
      View.printWinners(race.winners);
    } catch (error) {
      console.log(error);
      View.printError(error);
    }
  }
}

const app = new App();
app.play();
