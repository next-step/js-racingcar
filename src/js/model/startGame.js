import { GAME } from '../constants.js';
import { printCarRacingResult } from '../ui/printCarRacingResult.js';
import showPlayer from '../ui/showPlayer.js';
import getRandomNumber from './getRandomNumber.js';
import getResult from './getResult.js';
import State from './state.js';

const arrowTemplate = () => {
  return `<div class="forward-icon mt-2">⬇️️</div>`;
};

function isOverThresholdScore(score) {
  return score >= GAME.THRESHOLD_SCORE;
}

function carRacing(players) {
  Array.from(players).forEach(player => {
    const isForward = isOverThresholdScore(getRandomNumber());
    
    if(isForward) {
      player.dataset.forwardCount = Number(player.dataset.forwardCount) + 1;
      player.parentNode.insertAdjacentHTML('beforeend', arrowTemplate());
    }
  })
}

export default function startGame(counts) {
  const players = State.player.split(',');
  showPlayer(players);

  const playerElements = document.querySelectorAll('.car-player');
  for (let i = 0; i < counts; i++) {
    carRacing(playerElements);
  }

  const result = getResult();
  printCarRacingResult(result);
}