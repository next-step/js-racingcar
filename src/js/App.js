import UserInput from "./components/UserInput.js";
import GameProcess from "./components/GameProcess.js";
import GameResult from "./components/GameResult.js";

class App {
  constructor() {
    this.#render();
    this.#setComponents();
  }

  /** Variables for State */
  #carNames = [];
  #count = 0;

  /** Components */
  #userInputComponentTarget;
  #gameProcessComponentTarget;
  #gameResultComponentTarget;

  #render = () => {
    console.log("render() called");
    const target = document.querySelector("#app");
    target.innerHTML = `
   
      <section id="user-input-component">
      </section>
      <section id="game-process-component">
      </section>
      <section id="game-result-component">
      </section>
  
      `;
  };

  #setComponents = () => {
    this.#userInputComponentTarget = document.querySelector(
      "#user-input-component"
    );
    this.#gameProcessComponentTarget = document.querySelector(
      "#game-process-component"
    );
    this.#gameResultComponentTarget = document.querySelector(
      "#game-result-component"
    );
    new UserInput(this.#userInputComponentTarget, this.#onSubmitUserInputForm);
    new GameProcess(this.#gameProcessComponentTarget);
    new GameResult(this.#gameResultComponentTarget);

    this.#gameProcessComponentTarget.hidden = true;
    this.#gameResultComponentTarget.hidden = true;
  };

  /** Event Setting */
  #setEvents = () => {
    console.log("setEvents() called");
  };

  /** Handler Functions */
  #onSubmitUserInputForm = (carNames, count) => {
    this.#carNames = carNames.split(",");
    this.#count = count;
    this.#gameProcessComponentTarget.hidden = false;
  };

  #updateCarPlayerLabels = (carsArray) => {
    const carPlayerTarget = document.querySelectorAll(".car-player");
    carPlayerTarget.forEach((element, index) => {
      element.innerText = carsArray[index];
    });
  };
}

new App();
