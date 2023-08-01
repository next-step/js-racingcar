import Game from "../Models/Game";
import View from "../View/View";

export default class GameController {
  #view;
  #game;

  constructor() {
    this.#view = new View();
    this.addEventHandlerToView();
  }

  /**
   * @returns {View}
   */
  get view() {
    return this.#view;
  }

  /**
   * @returns {Game}
   */
  get game() {
    return this.#game;
  }

  /**
   * View에서 userInput을 받았을 때, GameFlow가 수행되도록 이벤트 핸들러를 등록한다.
   */
  addEventHandlerToView() {
    this.#view.handleInputWith((userInput) => this.#playGameWith(userInput));
  }

  /**
   * 1. View에서 받은 userInput을 기반으로 게임을 설정한다.
   * 2. 게임을 수행한다.
   * 3. 게임 결과를 View로 출력한다.
   * 4. 에러 발생 시 에러 메시지를 View로 출력하고, 프로그램을 즉시 중단한다.
   */
  #playGameWith(userInput) {
    try {
      this.#setGame(userInput);
      this.#startGame();
      this.#printGameResult();
    } catch (error) {
      this.#printError(error);
    }
  }

  /**
   * userInput을 기반으로 Game Model 객체를 생성한다.
   * @param {string} userInput
   */
  #setGame(userInput) {
    this.#game = new Game(userInput);
  }

  /**
   * Game Model 객체를 기반으로 게임을 수행한다.
   */
  #startGame() {
    this.#game.play();
  }

  /**
   * Game Model 객체를 기반으로 게임 결과를 View로 출력한다.
   */
  #printGameResult() {
    this.#view.logResultGuideMessage();

    this.#game.roundHistory.forEach((roundCarsInfo) => {
      this.#view.logRoundStatus(roundCarsInfo);
    });

    this.#view.logWinners(this.#game.winners);
  }

  /**
   * 에러 메시지를 View로 출력한다.
   * @param {Error} error
   */
  #printError(error) {
    this.#view.logErrorMessage(error.message);
  }
}
