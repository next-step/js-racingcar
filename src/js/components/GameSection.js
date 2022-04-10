import Template from '../Template.js';
import { CONTROLL_KEY, DICE_RANGE } from '../constants.js';
import { pipeline } from '../factory/index.js';
import { $element, generateRandomNumbers } from '../helpers/index.js';

const template = /*html*/ `
<section class="d-flex justify-center mt-5 hidden"></section>`;

const panel = cars => /*html*/ `
<div class="mt-4 d-flex">${cars
  .map(
    car => `
      <div class="mr-2" id="${car.name}">
        <div class="car-player">${car.name}</div>
        ${Array(car.moveCount)
          .map(() => moveFoward)
          .join('')}
        ${spinner}
      </div>`,
  )
  .join('')}</div>`;

const spinner = /*html*/ `
<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;

const moveFoward = /*html*/ `
<div class="forward-icon mt-2">⬇️️</div>`;

export default class GameSection extends Template {
  #cars;
  #tryCount;

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  // TODO: functional, Promise + requestAnimationFrame
  start() {
    const randomNumberRange = {
      count: this.#cars.length,
      min: DICE_RANGE.MIN,
      max: DICE_RANGE.MAX,
    };

    let index = 0;
    let maxMoveCount = 1;

    const timerId = setInterval(() => {
      index++;
      const dice = generateRandomNumbers(randomNumberRange);
      this.#cars.forEach((car, indexNumber) => {
        const $car = document.getElementById(car.name);
        if (dice[indexNumber] >= 4) {
          car.moveCount = car.moveCount + 1;
          $car.insertBefore($element(moveFoward), $car.lastElementChild);
        }
        if (maxMoveCount < car.moveCount) maxMoveCount = car.moveCount;
      });

      if (this.#tryCount <= index) {
        clearInterval(timerId);
        const result = this.#cars
          .reduce((acc, { name, moveCount }) => {
            if (maxMoveCount === moveCount) acc.push(name);
            return acc;
          }, [])
          .join(', ');
        this.dispatch('winners', { winners: result });
        this.#cars.forEach(v => {
          const $car = document.getElementById(v.name);
          $car.lastElementChild.remove();
        });
      }
    }, 1000);
  }

  static get observedAttributes() {
    return ['try-count'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue) return this.firstElementChild.classList.add('hidden');

    this.#cars = pipeline(CONTROLL_KEY.GAME_BEFORE, this.getAttribute('car-names'));
    this.#tryCount = this.getAttribute('try-count');

    this.firstElementChild.classList.remove('hidden');
    this.firstElementChild.insertAdjacentElement('afterbegin', $element(panel(this.#cars)));

    this.start();
  }
}

customElements.define('game-section', GameSection);
