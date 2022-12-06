// eslint-disable-next-line no-unused-vars
import { Car } from '../service/Car.js';
import { ELEMENT } from './element.js';
import { selector, selectorAll } from './selector.js';

/**
 *
 * @param {HTMLElement} element
 * @param {string} className
 */
export const addClass = (element, className) => {
  element.classList.add(className);
};

/**
 *
 * @param {HTMLElement} element
 * @param {string} className
 */
export const removeClass = (element, className) => {
  element.classList.remove(className);
};

/**
 *
 * @param {HTMLElement} element
 * @param {function} callback
 */
export const setClickListener = (element, callback) => {
  selector(element).addEventListener('click', callback);
};

/**
 *
 * @param {HTMLElement} element
 * @param {function} callback
 */
export const setInputEnterListener = (element, callback) => {
  selector(element).addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      callback();
    }
  });
};

/**
 *
 * @param {Car[]} cars
 * @returns {string}
 */
const getWinnerText = (cars) => {
  return `🏆 최종 우승자: ${cars.map((car) => car.getName()).join(', ')} 🏆`;
};

/**
 *
 * @param {Car[]} winners
 */
export const updateWinners = (winners) => {
  selector(ELEMENT.SUBTITLE.WINNER).innerText = getWinnerText(winners);
};

export const SPINNER = `
  <div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
`;

/**
 *
 * @param {Car} car
 * @returns {string}
 */
export const getCarRuts = (car) => {
  const carNameDiv = `<div class="car-player">${car.getName()}</div>`;
  const getCarRutDiv = (movedDistance) => {
    const getDiv = (str) => `<div class="forward-icon mt-2">${str}</div>`;
    return Array.from({ length: movedDistance })
      .map(() => getDiv(`⬇️`))
      .join('');
  };
  return `
  <div class="mr-2" data-car-name=${car.getName()}>
    ${carNameDiv}
    ${getCarRutDiv(car.getMovedDistance())}
    ${SPINNER}
  </div>
  `;
};

/**
 *
 * @param {Car[]} cars
 */
export const updateCarsRut = (cars) => {
  selector(ELEMENT.DIV.CAR_RACING).innerHTML = cars.map((car) => getCarRuts(car)).join('');
};

export const removeSpinners = () => {
  selectorAll(ELEMENT.SPINNER).forEach((el) => el.remove());
};
