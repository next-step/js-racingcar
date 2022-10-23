import initializeCarNames from './ui/initializeCarNames.js';
import initializeAttemptCount from './ui/initializeAttemptCount.js';
import resetAttemptsCount from './ui/resetAttemptsCount.js';
import resetCarName from './ui/resetCarName.js';
import hide from './ui/hide.js';

function resetGame() {
  const racingWrapper = document.getElementById('racing-wrapper');
  const resultWrapper = document.getElementById('result-wrapper');
  resetCarName();
  resetAttemptsCount();
  hide(racingWrapper);
  hide(resultWrapper);
}

export default function addEvent() {
  const carNameButton = document.querySelector('.btn-car-name');
  const attemptCountButton = document.querySelector('.btn-attempts-count');
  const attemptCount = document.querySelector('.attempts-count');
  const replayButton = document.querySelector('.btn-replay');
  
  carNameButton.addEventListener('click', initializeCarNames);
  attemptCountButton.addEventListener('click', initializeAttemptCount);
  attemptCount.addEventListener('keyup', initializeAttemptCount);
  replayButton.addEventListener('click', resetGame);
}