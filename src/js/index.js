import { App } from './app.js';

window.onerror = function (msg) {
  alert(msg.replace('Uncaught Error: ', ''));
  return true;
};

new App();
