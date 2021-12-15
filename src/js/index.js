import { App } from './app.js';

window.onerror = function (msg) {
  alert(msg);
  return true;
};

new App();
