import addEvent from './addEvent.js';
import init from './ui/init.js';

function startCarRacingGame() {
  init();
  addEvent();
}

window.addEventListener('load', startCarRacingGame);
