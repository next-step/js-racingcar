import addEvent from './addEvent.js';
import init from './presentation/init.js';

function startCarRacingGame() {
  init();
  addEvent();
}

window.addEventListener('load', startCarRacingGame);
