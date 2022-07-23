import { RoundsInput } from "./RoundsInput.js";
import { CarFactory } from "./CarFactory.js";
import { APP, FORM } from "./utils/selector.js";

class App {
  $app;
  cars;
  carFactory;
  rounds;
  roundsInput;

  constructor($app) {
    this.$app = $app;
    const $form = $app.querySelector(FORM);
    this.carFactory = new CarFactory($form, {
      onCarsGenerated: this.registerCars.bind(this),
    });
    this.roundsInput = new RoundsInput($form, {
      onSetRounds: this.setRounds.bind(this),
    });
  }

  setRounds(rounds) {
    this.rounds = rounds;
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
