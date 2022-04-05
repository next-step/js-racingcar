import { $ } from '../utils/dom.js';
import { MIN_CARS_NUMBER, MIN_RACE_TIMES } from '../constants/validation.js';
import { WAIT_TIME } from '../constants/common.js';
import Car from './car.js';
import Template from '../template.js';

  this.$gameProcess = $('.game-process-container');
  this.$carsContainer = $('.cars-container');
  this.$cars = null;
  this.template = new Template();

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { cars, raceTimes, raceFinishedFlag } = this.state;

    if (raceFinishedFlag) return;

    this.$carsContainer.classList.toggle('hidden', !this.isPossibleGameProcess(cars, raceTimes));

    if (this.isPossibleGameProcess(cars, raceTimes)) {
      this.processReady(cars);
      this.processRun();
    }
  };

  this.isPossibleGameProcess = (cars, raceTimes) => cars.length >= MIN_CARS_NUMBER && raceTimes >= MIN_RACE_TIMES;

  this.processReady = (cars) => {
    this.$carsContainer.innerHTML = '';
    this.$cars = cars.map(
      (car) =>
        new Car({
          $target: this.$carsContainer,
          $spinner: this.template.$spinnerElement,
          $forward: this.template.$forwardElement,
          initState: { id: car.id, carName: car.carName, goCount: car.goCount },
        })
    );
  };

  this.processRun = () => {
    let currentRaceTimes = MIN_RACE_TIMES;
    const intervalId = setInterval(() => {
      this.$cars.forEach(($car) => {
        if (Car.checkAbleGo(Car.getRandomNumber())) $car.go();
      });

      if (currentRaceTimes++ >= this.state.raceTimes) {
        this.$cars.forEach(($car) => {
          $car.finish();
        });
        clearInterval(intervalId);
        handleRaceResult({
          cars: this.$cars.map(($car) => $car.state),
          raceFinishedFlag: !this.state.raceFinishedFlag,
        });
      }
    }, WAIT_TIME);
  };
}
