import { BOUNDARY, NUMBERS } from "../utils/constant.js";
import { RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";

export default function RacingApp() {
  const input = new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();
  const movableStrategy = () => Math.random() * NUMBERS.RANDOM_BOUND >= BOUNDARY.FORWARD;

  this.render = () => {
    for(var i =1; i< 4; i++) {
      process.moveAtTime(cars, i);
    }
  }

  this.inputCar = carNames => {
    cars.setNames(carNames);
    this.init();
  }

  this.inputTry = tryNum => {
    cars.move(tryNum, movableStrategy());
  }

  this.init = () => {
    process.init(cars);
    this.render();
  }
}