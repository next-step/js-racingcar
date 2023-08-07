import Game from "../Models/Game";
import PromptView from "../View/PromptView";

export default class GameController {
  #view;
  #game;

  constructor() {
    this.#view = new PromptView();
    this.#addEventHandlerToView();
  }

  get view() {
    return this.#view;
  }

  get game() {
    return this.#game;
  }

  #addEventHandlerToView() {
    const promptEventHandler = (userInput) => this.#playGameWith(userInput);
    this.#view.addEventHandlerToPrompt(promptEventHandler);
  }

  #playGameWith(userInput) {
    try {
      this.#setUpGame(userInput);
      this.#startGame();
      this.#printGameResult();
    } catch (error) {
      this.#printError(error);
    }
  }

  #setUpGame(userInput) {
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
