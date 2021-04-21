import { RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";
import RacingResult from "./racingResult.js";

export default function RacingApp() {
  const input = new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();
  const result = new RacingResult();

  this.render = async () => {
    for(var i =1; i< 4; i++) {
      await process.moveAtTime(cars, i);
    }
    this.winner();
  }

  this.inputCar = carNames => {
    cars.setNames(carNames);
    this.init();
  }

  this.inputTry = tryNum => {
    cars.move(tryNum);
    this.render();
  }

  this.winner = () => {
    const winners = cars.winner();
    result.render(winners);
  }

  this.init = () => {
    process.init(cars);
  }
}