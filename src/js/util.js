import { VALIDATION } from './constant.js';

export const getEl = (selector, parent = document) => parent.querySelector(selector);
export const getEls = (selector, parent = document) => parent.querySelectorAll(selector);
export const disabledEl = (...elements) => elements.forEach(el => el.setAttribute('disabled', true));

export const isMove = () => {
    const num = Math.floor(Math.random() * VALIDATION.MAX_RANDOM_NUMVER);
    return num > VALIDATION.MOVE_CONDITION;
};

export const checkNameValidation = (cars) => {
    return !cars.some(car => car.length > VALIDATION.MAX_CAR_NAME_LENGTH);
};

export const resetGround = () => {
    getEl('#race-times-field').classList.toggle('show');
    getEl('#race-progress').innerHTML = '';
    getEl('#race-result').innerHTML = '';
    getEls('.interactive-element').forEach(el => {
        if (el.value) el.value = '';
        el.removeAttribute('disabled')
    });
};
