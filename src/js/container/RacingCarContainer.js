import { $ } from '../dom.js';
import RacingCar from '../components/RacingCar/RacingCar.js';

function RacingCarContainer(...props) {
  const [target, cars, racingNumber] = props;
  const carComponents = [];
  let racingTime = 0;
  let runInterval = '';

  target.innerHTML = template();
  const $carContainer = $('.car-container');

  setCarComponents();
  render();

  function render() {
    runInterval = setInterval(() => {
      runCars();
    }, 1000);
  }

  function template() {
    return `
			<div class="car-container mt-4 d-flex"></div>
		`;
  }

  function setCarComponents() {
    cars.map((car) => {
      const newCar = new RacingCar(car);
      $carContainer.appendChild(newCar.$target);
      carComponents.push(newCar);
    });
  }

  function runCars() {
    racingTime++;
    carComponents.forEach((carComponent) => {
      carComponent.runCar();
    });

    if (racingTime !== racingNumber) return;

    endRunCars();
  }

  function endRunCars() {
    clearInterval(runInterval);
    carComponents.forEach((carComponent) => {
      carComponent.endRunCar();
    });
  }
}

export default RacingCarContainer;
