import RacingInputView from "./views/RacingInputView.js";
import RacingGame from "./models/RacingGame.js";
import Validator from "./models/Validator.js";
import { splitCarName, generateNumberInRange } from "./utils/index.js";
import { SELECTOR, ERROR_MESSAGE, MOVEMENT } from "./constant/index.js";

const App = {
  carNames: null,
  tryCount: 0,

  init() {
    this.render();
    this.addEvent();
  },

  render() {
    const $app = document.querySelector(SELECTOR.APP);
    /*html */
    $app.innerHTML = `<section class="d-flex justify-center mt-5" >
    <form id ="racing-form">
    </form>
  </section>
  <section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex" id="car-container">
    </div>
  </section>
 `;

    RacingInputView.renderNameInput();
  },

  addEvent() {
    const $racingInputContainer = document.querySelector(SELECTOR.RACING_FORM);
    $racingInputContainer.addEventListener("click", ({ target }) => {
      if (target.closest(SELECTOR.NAME_SUBMIT_BUTTON)) {
        const { value } = document.querySelector(SELECTOR.NAME_INPUT);
        const splitCarNames = splitCarName(value);
        this.validateCarNameInput(splitCarNames);
        this.setCarNames(splitCarNames);
        target.disabled = true;
      }

      if (target.closest(SELECTOR.TRY_SUBMIT_BUTTON)) {
        this.setTryCount();
        target.disabled = true;
      }
    });

    $racingInputContainer.addEventListener("submit", e => {
      e.preventDefault();
      this.setCarNames();
    });
  },
  validateCarNameInput(splitCarNames) {
    if (!Validator.validateCarNames(splitCarNames)) {
      alert(ERROR_MESSAGE.NAME_LENGTH);
      return;
    }

    if (!Validator.validateDuplicateCarNames(splitCarNames)) {
      alert(ERROR_MESSAGE.NAME_DUPLICATE);
      return;
    }
  },
  setCarNames(splitCarNames) {
    this.carNames = splitCarNames;

    RacingInputView.renderTryCountInput();
  },

  setTryCount() {
    const { value } = document.querySelector(SELECTOR.TRY_INPUT);
    const tyrCount = Number(value);

    if (!Validator.validateTryCount(this.tryCount)) {
      alert(ERROR_MESSAGE.TRY_COUNT_RANGE);
      return;
    }

    this.tryCount = tyrCount;

    this.readyToStartGame();
  },

  readyToStartGame() {
    if (!this.tryCount | !this.c)
      const randomMovementsByCar = this.carNames.map(_ =>
        Array.from({ length: this.tryCount }).map(_ =>
          generateNumberInRange({ min: MOVEMENT.MIN, max: MOVEMENT.MAX })
        )
      );

    const carsInfo = this.carNames.map((carName, idx) =>
      Object.freeze({
        name: carName,
        movements: randomMovementsByCar[idx],
      })
    );
    RacingGame.start(carsInfo);
  },
};

App.init();
