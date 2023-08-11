import PromptView from "../View/PromptView";
import Game from "../Models/Game";

export default class GameController {
  #view;
  #game;

  constructor() {
    this.#view = new PromptView();
    this.#addEventHandlerToView();
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

    this.#view.logAllRoundStatus(this.#game.roundHistory);

    this.#view.logWinners(this.#game.winners);
  }

  #printError(error) {
    this.#view.logErrorMessage(error.message);
  }
}
