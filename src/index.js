import { RacingGame } from "./domain/RacingGame/RacingGame";
import { GAME_SIZE } from "./domain/RacingGame/_consts";

export class App {
  #racingGame;

  constructor() {
    this.#racingGame = new RacingGame();
    this.start();
  }

  async settingRacingGame() {
    const inputValue = await RacingGame.readCarNamesInput();
    this.#racingGame.setPlayers(
      this.#racingGame.getPlayerNamesFromInput(inputValue)
    );
    this.#racingGame.setRacingGameSize(GAME_SIZE);
  }

  async start() {
    await this.settingRacingGame();
    this.#racingGame.playGame();
  }
}

new App();
