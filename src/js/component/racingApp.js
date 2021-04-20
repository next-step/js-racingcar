import { RacingCars } from "./racingCar.js";
import RacingProcess from "./racingProcess.js";

export default function RacingApp() {
  const racingProcess = new RacingProcess();
  const racingCars = new RacingCars();

  this.render = () => {
    racingCars.move(2, true);
    for(var i =1; i< 4; i++) {
      racingProcess.moveAtTime(racingCars, i);
    }
    
  }

  this.init = () => {
    racingCars.setNames(["임시1", "임시2", "임시3"]);
    racingProcess.init(racingCars);
    this.render();
  }
}