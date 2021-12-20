import { $ } from './utils/querySelector';
import './App';

const $app = $('#app');

if ($app) $app.innerHTML = /*html*/ `<my-app />`;
else console.error("couldn't find $app");
