import { RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";

export default function RacingApp() {
  const input = new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();

  this.render = () => {
    cars.move(2, true);
    for(var i =1; i< 4; i++) {
      process.moveAtTime(cars, i);
    }
    
  }

  this.init = () => {
    cars.setNames(["임시1", "임시2", "임시3"]);
    process.init(cars);
    this.render();
  }
}