import startGame, { getWinners } from '../service/startGame.js';
import validateAttemptCount from '../model/validateAttemptCount.js';
import disableElements from './disableElements.js';
import RacingCar from '../model/RacingCar.js';
import showCars from './showCars.js';
import { printWinner } from './printWinner.js';

export default async function initializeAttemptCount(e) {
  if (e.key !== 'Enter' && e.type !== 'click') return;
  e.preventDefault();

  const attemptCount = document.querySelector('.attempts-count');
  const attemptCountButton = document.querySelector('.btn-attempts-count');

  try {
    const result = validateAttemptCount(attemptCount.value);
    RacingCar.count = result;
    disableElements(attemptCount, attemptCountButton);
    showCars();
    await startGame();
    RacingCar.winners = getWinners(RacingCar.cars, RacingCar.record);

    printWinner(RacingCar.winners);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
