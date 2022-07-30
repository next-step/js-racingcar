import { RoundsInput } from "./RoundsInput.js";
import { CarFactory } from "./CarFactory.js";
import { Winners } from "./Winners.js";

import { isHTMLElement } from "./utils/validator.js";
import { APP, CAR_CONTAINER, CAR_NAME_FORM, ROUNDS_FORM, WINNERS } from "./utils/selector.js";

class App {
  $app;
  $carContainer;
  cars;
  carFactory;
  rounds;
  roundsInput;
  currentRound = 0;
  winners;

  constructor($app) {
    if (!isHTMLElement($app)) {
      throw new TypeError(`${$app} is not a HTMLElement`);
    }

    this.$app = $app;
    const $carContainer = $app.querySelector(CAR_CONTAINER);
    this.$carContainer = $carContainer;

    this.carFactory = new CarFactory($app.querySelector(CAR_NAME_FORM), {
      $carContainer,
      onCarsGenerated: this.registerCars.bind(this),
    });

    this.roundsInput = new RoundsInput($app.querySelector(ROUNDS_FORM), {
      onSetRounds: this.startRacing.bind(this),
    });

    this.winners = new Winners($app.querySelector(WINNERS), {
      onReset: this.reset.bind(this),
    });
  }

  setupCars() {
    const cars = this.cars.map((car) => car.setup());
    this.$carContainer.append(...cars);
  }

  startRacing(rounds) {
    this.rounds = rounds;
    this.setupCars();
    this.disableButtons();
    this.race();
  }

  race() {
    this.currentRound++;
    Promise.all(this.cars.map((car) => car.move())).then(() => {
      if (this.currentRound >= this.rounds) {
        this.award();
      } else {
        this.race();
      }
    });
  }

  award() {
    this.winners.award(this.cars);
  }

  registerCars(cars) {
    this.cars = cars;
    this.showRoundsInput();
  }

  showRoundsInput() {
    this.roundsInput.showInput();
  }

  disableButtons() {
    this.carFactory.disableButton();
    this.roundsInput.disableButton();
  }

  reset() {
    this.cars = undefined;
    this.rounds = undefined;
    this.currentRound = 0;
    this.carFactory.rest();
    this.roundsInput.rest();
    this.winners.reset();
  }
}

new App(document.querySelector(APP));
