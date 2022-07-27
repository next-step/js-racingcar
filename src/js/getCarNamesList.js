import { $ } from './DOM.js';

const carNameInput = $('.car-name-input');

const getCarNamesList = () => carNameInput.value.replace(/ /g, '').split(',');

export default getCarNamesList;
