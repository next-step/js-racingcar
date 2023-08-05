import { RacingGame } from "./domain/RacingGame/RacingGame";
import {Console} from "./util/Console";
import RacingGameInputView from "./view/RacingGameInputView";
import RacingGameOutputView from "./view/RacingGameOutputView";

export class App {
  #racingGame;
  #inputView;
  #outputView;
  constructor() {
    this.#racingGame = new RacingGame();
    this.#inputView = new RacingGameInputView();
    this.#outputView = new RacingGameOutputView();
    this.#start();
  }

  async #settingRacingGame() {
    while(1) {
      try{
        const carNamesInputValue = await this.#inputView.readCarNamesInput();
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
        const racingGameSizeInputValue = await this.#inputView.readRacingGameSizeInput()
        this.#racingGame.setRacingGameSize(racingGameSizeInputValue);
        break;
      } catch (e) {
        Console.print(e.message)
      }
    }
  }

  #playRacingGame() {
    for (let round = 0; round < this.#racingGame.getRacingGameSize(); round++) {
      this.#racingGame.playOneRound();
      this.#outputView.printOneRoundGameResult(this.#racingGame.getPlayers());
    }
  }

  async #start() {
    await this.#settingRacingGame();
    this.#outputView.printGameResultHeader();
    this.#playRacingGame();
    this.#outputView.printWinnerLog(this.#racingGame.getWinnersNames());
    process.exit()
  }
}

new App();
