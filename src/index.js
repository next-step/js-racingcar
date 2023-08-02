import { RacingGame } from "./domain/RacingGame/RacingGame";

export class App {
  #racingGame;

  constructor() {
    this.#racingGame = new RacingGame();
    this.start();
  }

  async settingRacingGame() {
    const carNamesInputValue = await RacingGame.readCarNamesInput();
    const racingGameSizeInputValue = await RacingGame.readRacingGameSizeInput()
    this.#racingGame.setPlayers(
      this.#racingGame.getPlayerNamesFromInput(carNamesInputValue)
    );
    this.#racingGame.setRacingGameSize(racingGameSizeInputValue);
  }

  async start() {
    await this.settingRacingGame();
    this.#racingGame.playGame()
    process.exit()
  }
}

new App();
