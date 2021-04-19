import {initRegister} from './register.js';
import {initRacing} from './racing.js';

export const todoApp = () => {
    initRegister();
    initRacing();
};

window.onload = () => {
    todoApp();
};
