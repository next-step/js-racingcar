import { VALIDATION } from './constant.js';

export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);
export const disabledEl = (...elements) => elements.forEach(el => el.setAttribute('disabled', true));
export const isMove = () => {
    const num = Math.floor(Math.random() * VALIDATION.MAX_RANDOM_NUMVER);
    return num > VALIDATION.MOVE_CONDITION;
};
