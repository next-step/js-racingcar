import { deleteDelay, RacingCars } from "./racingCar.js";
import RacingInput from "./racingInput.js";
import RacingProcess from "./racingProcess.js";
import RacingResult from "./racingResult.js";
import { SECOND, ALERT_TIME, alertWinner } from "../utils/event.js";
import { NUMBERS } from "../utils/constant.js";

export default function RacingApp() {
  new RacingInput(this);
  const process = new RacingProcess();
  const cars = new RacingCars();
  const result = new RacingResult();
  var tryTime;
  var start = null;
  var time = NUMBERS.INIT_NUM;
  var timerId;

  this.render = () => {
    process.delay();
    timerId = requestAnimationFrame((timestamp) =>
      timer({ timestamp: timestamp, func: forward })
    );
  };

  const stop = (isWinner) => {
    window.cancelAnimationFrame(timerId);
    timeReset();
    isWinner ? alertWinner(isWinner) : this.winner();
  };

  const timer = ({ timestamp, func = "", isWinner = "" }) => {
    start ??= timestamp;
    var second = Math.floor((timestamp - start) / SECOND);
    if (time < second) {
      time = second;
      if (func) func(second);
    }
    if (time < tryTime) {
      requestAnimationFrame((timestamp) =>
        timer({ timestamp: timestamp, func: func, isWinner: isWinner })
      );
    }
    if (time === tryTime) stop(isWinner);
  };

  const timeReset = () => {
    start = null;
    time = NUMBERS.INIT_NUM;
  };

  const forward = (second) => {
    process.moveAtTime(cars, second);
    process.delay();
  };

  this.inputCar = (carNames) => {
    cars.setNames(carNames);
  };

  this.inputTry = (tryNum) => {
    cars.move(tryNum);
    this.init();
    tryTime = tryNum;
    this.render();
  };

  this.winner = () => {
    deleteDelay();
    const winners = cars.winner();
    result.render(winners);
    tryTime = ALERT_TIME;
    timerId = requestAnimationFrame((timestamp) =>
      timer({ timestamp: timestamp, isWinner: winners })
    );
  };

  this.init = () => {
    process.init(cars);
  };
}
