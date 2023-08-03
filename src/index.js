import { RacingGame } from "./domain/RacingGame/RacingGame";
import {Console} from "./util/Console";

export class App {
  #racingGame;

  constructor() {
    this.#racingGame = new RacingGame();
    this.start();
  }

  async settingRacingGame() {
    while(1) {
      try{
        const carNamesInputValue = await RacingGame.readCarNamesInput();
        this.#racingGame.setPlayers(
            this.#racingGame.getPlayerNamesFromInput(carNamesInputValue)
        );
        break;
      } catch (e) {
        Console.print(e.message)
      }
    }

    while(1) {
      try{
        const racingGameSizeInputValue = await RacingGame.readRacingGameSizeInput()
        this.#racingGame.setRacingGameSize(racingGameSizeInputValue);
        break;
      } catch (e) {
        Console.print(e.message)
      }
    }
  }

  async start() {
    await this.settingRacingGame();
    this.#racingGame.playGame()
    process.exit()
  }
}

new App();
