import { deleteDelay, RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";
import RacingResult from "./racingResult.js";
import { SECOND, ALERT_TIME, alertWinner } from "../utils/event.js";

export default function RacingApp() {
  const input = new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();
  const result = new RacingResult();
  var start = null;

  this.render = time => {
    process.delay();
    const timerId = setInterval(() => requestAnimationFrame(timer), SECOND);
    setTimeout(() => {clearInterval(timerId); stop();}, time*SECOND);
  }

  const stop = () => {
    deleteDelay();
    this.winner();
  }

  const timer = timestamp => {
    start ??= timestamp;
    var second = Math.floor((timestamp - start)/SECOND) + 1;
    process.moveAtTime(cars, second);
    process.delay();
  }

  this.inputCar = carNames => {
    cars.setNames(carNames);
  }

  this.inputTry = tryNum => {
    cars.move(tryNum);
    this.init();
    this.render(tryNum);
  }

  this.winner = () => {
    const winners = cars.winner();
    result.render(winners);
    const alertId = setInterval(() => requestAnimationFrame(() => {}), SECOND);
    setTimeout(() => {clearInterval(alertId); alertWinner(winners);}, ALERT_TIME*SECOND);
  }

  this.init = () => {
    process.init(cars);
  }

}