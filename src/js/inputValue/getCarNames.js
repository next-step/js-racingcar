import { $ } from '../selector/DOM.js';

const carNameInput = $('.car-name-input');

const getCarNames = () => carNameInput.value.replace(/\s/g, '').split(',');

export default getCarNames;
