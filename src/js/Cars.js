import { $, createEl } from './utils/dom.js';
import { getRandomInt } from './utils/random.js';

export class Cars {
  constructor({ onRaceEnd }) {
    this.cars = [];
    this.raceTimes = 0;
    this.container = $('#section-car-race');
    this.onRaceEnd = onRaceEnd;
  }

  setState({ cars, raceTimes }) {
    this.cars = cars.map((name) => ({ name, moves: 0, ref: null }));
    this.raceTimes = raceTimes;
    this.render();
    this.raceStart();
  }

  raceStart() {
    let times = 0;
    let timer = null;

    timer = setInterval(() => {
      this.moveCarsRandomly();

      if (times >= this.raceTimes) {
        this.removeSpinner();
        clearInterval(timer);
        this.onRaceEnd?.(this.cars);
      }
      times += 1;
    }, 1000);
  }

  moveCarsRandomly() {
    this.cars = this.cars.map((car) => {
      const randNum = getRandomInt(0, 9);
      if (randNum < 4) return car;
      const arrowEl = Cars.createArrowElement();
      car.ref.prepend(arrowEl);
      car.moves += 1;
      return car;
    });
  }

  render() {
    this.cars.forEach(({ name }, index) => {
      const carElement = Cars.createCarElement(name, this.cars[index]);
      const spinnerElement = Cars.createSpinnerElement();
      this.cars[index].ref.appendChild(spinnerElement);
      this.container.appendChild(carElement);
    });
  }

  removeSpinner() {
    this.cars.forEach(({ ref }) => {
      const spinner = ref.lastElementChild;
      spinner.remove();
    });
  }

  reset() {
    this.cars = [];
    this.raceTimes = 0;
    this.container.innerHTML = '';
  }

  static createCarElement(name, car) {
    const carContainer = createEl('div');
    const carPlayer = createEl('div');
    const racingField = createEl('div');
    carContainer.setAttribute('class', 'car mr-2');
    carPlayer.setAttribute('class', 'car-player');
    carPlayer.textContent = name;
    carContainer.appendChild(carPlayer);
    carContainer.appendChild(racingField);
    car.ref = racingField;
    return carContainer;
  }

  static createSpinnerElement() {
    const flexContainer = createEl('div');
    const spinnerContainer = createEl('div');
    const spinner = createEl('span');
    flexContainer.setAttribute('class', 'd-flex justify-center mt-3');
    spinnerContainer.setAttribute('class', 'relative spinner-container');
    spinner.setAttribute('class', 'material spinner');
    flexContainer.append(spinnerContainer);
    spinnerContainer.appendChild(spinner);
    return flexContainer;
  }

  static createArrowElement() {
    const arrow = createEl('div');
    arrow.setAttribute('class', 'forward-icon mt-2');
    arrow.textContent = '⬇️️';
    return arrow;
  }
}
