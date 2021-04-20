import { RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";

export default function RacingApp() {
  const input = new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();

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
    cars.move(tryNum, true);
  }

  this.init = () => {
    process.init(cars);
    this.render();
  }
}