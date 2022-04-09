import { DICE_RANGE } from '../constants.js';
import { $template, generateRandomNumbers } from '../helpers/index.js';

const spinner = /*html*/ `
<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;

const GameSectionTemplate = cars => {
  if (cars.length < 1) return $template(`/*html*/<section></section>`);
  return $template(/*html*/ `
<section class="d-flex justify-center mt-5" name="game-section">
  <div class="mt-4 d-flex">
    ${cars
      .map(
        car => `
    <div class="mr-2" id="${car.name}">
      <div class="car-player">${car.name}</div>
      ${Array(car.moveCount)
        .map(_ => moveFoward)
        .join('')}
      ${spinner}
    </div>`,
      )
      .join('')}
  </div>
</section>`);
};

const moveFoward = /*html*/ `
<div class="forward-icon mt-2">⬇️️</div>
`;

export default class GameSection extends HTMLElement {
  #cars = [];
  #tryCount = 0;

  constructor() {
    super();
  }

  connectedCallback() {
    const carNames = document.querySelector('racing-app').getAttribute('car-names');
    const tryCount = document.querySelector('racing-app').getAttribute('try-count');
    const winners = document.querySelector('racing-app').getAttribute('winners');
    if (!carNames) return;
    if (winners) return;
    this.#cars = carNames.split(',').map(carName => ({ name: carName, moveCount: 0 }));
    this.#tryCount = tryCount;
    this.insertAdjacentElement('afterbegin', GameSectionTemplate(this.#cars));
    this.start();
  }

  start() {
    const randomNumberRange = {
      count: this.#cars.length,
      min: DICE_RANGE.MIN,
      max: DICE_RANGE.MAX,
    };

    let index = 1;
    let maxMoveCount = 1;
    const timerId = setInterval(() => {
      if (this.#tryCount <= index) {
        clearInterval(timerId);
        console.log(maxMoveCount, this.#cars);
        const result = this.#cars
          .reduce((acc, cur) => {
            if (maxMoveCount === cur.moveCount) acc.push(cur.name);
            return acc;
          }, [])
          .join(', ');
        document.querySelector('racing-app').setAttribute('winners', result);
        document.querySelector('[name="result-section"]').classList.remove('hidden');
        this.#cars.forEach((v, n) => {
          const $car = document.getElementById(v.name);
          $car.lastElementChild.remove();
        });
      }
      index++;
      const dice = generateRandomNumbers(randomNumberRange);
      this.#cars.forEach((v, n) => {
        const $car = document.getElementById(v.name);
        if (dice[n] >= 4) {
          v.moveCount = v.moveCount + 1;
          $car.insertBefore($template(moveFoward), $car.lastElementChild);
        }
        if (maxMoveCount < v.moveCount) maxMoveCount = v.moveCount;
      });
    }, 1000);
  }
}

customElements.define('game-section', GameSection);
