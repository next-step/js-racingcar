import startGame from '../service/startGame.js';
import validateAttemptCount from '../model/validateAttemptCount.js';
import disableElements from './disableElements.js';

export default function initializeAttemptCount(e) {
  if (e.key !== 'Enter' && e.type !== 'click') return;
  e.preventDefault();

  const attemptCount = document.querySelector('.attempts-count');
  const attemptCountButton = document.querySelector('.btn-attempts-count');

  try {
    validateAttemptCount(attemptCount.value);
    disableElements(attemptCount, attemptCountButton);
    startGame(attemptCount.value);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
