import Game from "./Game";
import View from "./View";

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
    this.#view.handleInputWith((userInput) => this.#playGameWith(userInput));
  }

  #playGameWith(userInput) {
    try {
      this.#setGame(userInput);
      this.#startGame();
      this.#printGameResult();
    } catch (error) {
      // 에러 발생 시 에러 메시지 보여주고 프로그램 종료
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
