// eslint-disable-next-line no-unused-vars
import { Car } from '../service/Car.js';
import { CAR_RACING } from '../service/constant.js';
import { ELEMENT } from './element.js';
import { selector } from './selector.js';

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
  return `🏆 최종 우승자: ${cars.map((car) => car.getCarName()).join(', ')} 🏆`;
};

/**
 *
 * @param {Car[]} winners
 */
export const updateWinners = (winners) => {
  selector(ELEMENT.SUBTITLE.WINNER).innerText = getWinnerText(winners);
};

/**
 *
 * @param {Car} car
 * @returns {string}
 */
export const getCarRuts = (car) => {
  const carNameDiv = `<div class="car-player">${car.getCarName()}</div>`;
  const getCarRutDiv = (movedDistance) => {
    const getDiv = (str) => `<div class="forward-icon mt-2">${str}</div>`;
    return Array.from({ length: movedDistance })
      .map(() => getDiv(`⬇️`))
      .join('');
  };
  return `
  <div class="mr-2">
    ${carNameDiv}
    ${getCarRutDiv(car.getMovedDistance())}  
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
