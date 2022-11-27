// eslint-disable-next-line no-unused-vars
import { Car } from '../service/Car.js';
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
  return `최종 우승자: ${cars.map((car) => car.getCarName()).join(', ')}`;
};

/**
 *
 * @param {Car[]} winners
 */
export const updateWinners = (winners) => {
  selector(ELEMENT.SUBTITLE.WINNER).innerText = getWinnerText(winners);
};
