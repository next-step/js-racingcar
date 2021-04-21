import {initRegister} from './register/register.js';
import {initRacing} from './racing.js';

export const todoApp = () => {
    initRegister();
    initRacing();
};

window.onload = () => {
    todoApp();
};
