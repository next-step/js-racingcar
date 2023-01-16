import initializeCarNames from './presentation/initializeCarNames.js';
import initializeAttemptCount from './presentation/initializeAttemptCount.js';

export default function addEvent() {
  const carNameButton = document.querySelector('.btn-car-name');
  const attemptCountButton = document.querySelector('.btn-attempts-count');
  const attemptCount = document.querySelector('.attempts-count');
  const replayButton = document.querySelector('.btn-replay');
  
  carNameButton.addEventListener('click', initializeCarNames);
  attemptCountButton.addEventListener('click', initializeAttemptCount);
  attemptCount.addEventListener('keyup', initializeAttemptCount);
  replayButton.addEventListener('click', () => window.location.reload());
}