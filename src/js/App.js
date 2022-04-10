import UserInput from "./components/UserInput.js";

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
        <div class="d-flex justify-center mt-5">
          <div class="mt-4 d-flex">
            <div class="mr-2">
              <div class="car-player">EAST</div>
              <div class="forward-icon mt-2">⬇️️</div>
              <div class="forward-icon mt-2">⬇️️</div>
            </div>
            <div class="mr-2">
              <div class="car-player">WEST</div>
              <div class="forward-icon mt-2">⬇️️</div>
            </div>
            <div class="mr-2">
              <div class="car-player">SOUTH</div>
              <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>
            </div>
            <div class="mr-2">
              <div class="car-player">NORTH</div>
              <div class="d-flex justify-center mt-3">
                <div class="relative spinner-container">
                  <span class="material spinner"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="game-result-component">
        <div class="d-flex justify-center mt-5">
          <div>
            <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
            <div class="d-flex justify-center">
              <button type="button" class="btn btn-cyan">다시 시작하기</button>
            </div>
          </div>
        </div>
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
