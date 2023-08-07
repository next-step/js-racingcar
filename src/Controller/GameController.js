import Game from "../Models/Game";
import View from "../View/View";

export default class GameController {
  #view;
  #game;

  constructor() {
    this.#view = new View();
    this.addEventHandlerToView();
  }

  get view() {
    return this.#view;
  }

  get game() {
    return this.#game;
  }

  addEventHandlerToView() {
    const promptEventHandler = (userInput) => this.#playGameWith(userInput);
    this.#view.addEventHandlerToPrompt(promptEventHandler);
  }

  #playGameWith(userInput) {
    try {
      this.#setGame(userInput);
      this.#startGame();
      this.#printGameResult();
    } catch (error) {
      this.#printError(error);
    }
  }

  #setGame(userInput) {
    this.#game = new Game(userInput);
  }

  #startGame() {
    this.#game.play();
  }

  #printGameResult() {
    this.#view.logResultGuideMessage();

    this.#game.roundHistory.forEach((roundCarsInfo) => {
      this.#view.logRoundStatus(roundCarsInfo);
    });

    this.#view.logWinners(this.#game.winners);
  }

  #printError(error) {
    this.#view.logErrorMessage(error.message);
  }
}
