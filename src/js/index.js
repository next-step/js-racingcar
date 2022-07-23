import { RoundsInput } from "./RoundsInput.js";
import { CarFactory } from "./CarFactory.js";

import { isHTMLElement } from "./utils/validator.js";
import { APP, CAR_CONTAINER, CAR_NAME_FORM, ROUNDS_FORM } from "./utils/selector.js";

class App {
  $app;
  $carContainer;
  cars;
  carFactory;
  rounds;
  roundsInput;

  constructor($app) {
    if (!isHTMLElement($app)) {
      throw new TypeError(`${$app} is not a HTMLElement`);
    }

    this.$app = $app;
    this.$carContainer = $app.querySelector(CAR_CONTAINER);

    this.carFactory = new CarFactory($app.querySelector(CAR_NAME_FORM), {
      $app: $app,
      onCarsGenerated: this.registerCars.bind(this),
    });

    this.roundsInput = new RoundsInput($app.querySelector(ROUNDS_FORM), {
      onSetRounds: this.startRacing.bind(this),
    });
  }

  startRacing(rounds) {
    const cars = this.cars.map((car) => car.setup(rounds));
    this.$carContainer.append(...cars);
    this.race();
  }

  race() {
    this.cars.forEach((car) => car.race());
  }

  registerCars(cars) {
    this.cars = cars;
    this.showRoundsInput();
  }

  showRoundsInput() {
    this.roundsInput.showInput();
  }
}

new App(document.querySelector(APP));
