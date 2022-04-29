import { UserInput } from "./components/UserInput.js";
import { GameProcess } from "./components/GameProcess.js";
import { GameResult } from "./components/GameResult.js";

class App {
  constructor() {
    this.#render();
    this.#setComponents();
  }

  /** Variables for State */
  #carNames = [];
  #count = 0;

  #render = () => {
    console.log("render() called");
    const target = document.querySelector("#app");
    const html = `
    <section id="user-input-component">
    </section>
    <section id="game-process-component">
    </section>
    <section id="game-result-component">
    </section>
    `;
    target.innerHTML = html;
  };

  #setComponents = () => {
    UserInput(this.#onSubmitUserInputForm);
  };

  /** Handler Functions */
  #onSubmitUserInputForm = (carNames, count) => {
    this.#carNames = carNames;
    this.#count = count;

    // GameProcess 컴포넌트 생성
    GameProcess(this.#carNames, this.#count, this.#onCompleteGame);
  };

  #onCompleteGame = (cars) => {
    const winner = cars.reduce((prev, current) => {
      return prev.distance > current.distance ? prev : current;
    });
    console.log(winner);
    this.#showGameResult(winner.name);
  };

  #showGameResult = (winnerString) => {
    GameResult(winnerString, this.#restartGame);
  };

  #restartGame = () => {
    this.#render();
    this.#setComponents();
  };
}

new App();
