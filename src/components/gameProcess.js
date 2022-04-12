import { $ } from '../utils/dom.js';
import { MIN_CARS_NUMBER, MIN_RACE_TIMES } from '../constants/validation.js';
import { WAIT_TIME } from '../constants/common.js';
import Car from './car.js';

export default function GameProcess({ initState, handleRaceResult }) {
  this.$gameProcess = $('.game-process-container');
  this.$carsContainer = $('.cars-container');
  this.$cars = null;

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = async () => {
    const { cars, raceTimes, raceFinishedFlag } = this.state;

    if (raceFinishedFlag) return;

    this.$carsContainer.classList.toggle('hidden', !this.isPossibleGameProcess(cars, raceTimes));

    if (this.isPossibleGameProcess(cars, raceTimes)) {
      this.processReady(cars);
      await this.processRun().then((newState) => handleRaceResult(newState));
    }
  };

  this.isPossibleGameProcess = (cars, raceTimes) => cars.length >= MIN_CARS_NUMBER && raceTimes >= MIN_RACE_TIMES;

  const getSpinnerElement = () => {
    const $spinnerElement = document.createElement('div');
    $spinnerElement.className = 'd-flex justify-center mt-3';
    $spinnerElement.dataset.cy = 'spinner-icon';
    $spinnerElement.innerHTML = String.raw`
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    `;

    return $spinnerElement;
  };

  const getForwardElement = () => {
    const $forwardElement = document.createElement('div');
    $forwardElement.className = 'forward-icon mt-2';
    $forwardElement.textContent = '⬇️';

    return $forwardElement;
  };

  this.processReady = (cars) => {
    this.$carsContainer.innerHTML = '';
    this.$cars = cars.map(
      (car) =>
        new Car({
          $target: this.$carsContainer,
          $spinner: getSpinnerElement(),
          $forward: getForwardElement(),
          initState: { id: car.id, carName: car.carName, goCount: car.goCount },
        })
    );
  };

  this.processRun = () =>
    new Promise((resolve) => {
      let currentRaceTimes = MIN_RACE_TIMES;
      const intervalId = setInterval(() => {
        this.$cars.forEach(($car) => {
          if (Car.checkAbleGo(Car.getRandomNumber())) $car.go();
        });

        if (currentRaceTimes++ >= this.state.raceTimes) {
          this.$cars.forEach(($car) => {
            $car.finish();
          });
          resolve({
            cars: this.$cars.map(($car) => $car.state),
            raceFinishedFlag: !this.state.raceFinishedFlag,
          });
          clearInterval(intervalId);
        }
      }, WAIT_TIME);
    });
}
