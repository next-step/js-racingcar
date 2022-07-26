import { $ } from './DOM.js';

const carNameInput = $('.car-name-input');

const getCarNames = () => carNameInput.value.replace(/ /g, '').split(',');

export default getCarNames;
