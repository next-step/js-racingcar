import validateAttemptCount from '../presentation/validateAttemptCount.js';
import disableElements from './disableElements.js';
import showCarNames from './showCarNames.js';
import RacingCar from '../application/RacingCar.js';
import getFullRacingRecord from './getFullRacingRecord.js';
import playRacing from './playRacing.js';
import { printWinner } from './printWinner.js';

export default async function initializeAttemptCount(e) {
  if (e.key !== 'Enter' && e.type !== 'click') return;
  e.preventDefault();

  const carName = document.querySelector('.car-name');
  const attemptCount = document.querySelector('.attempts-count');
  const attemptCountButton = document.querySelector('.btn-attempts-count');
  const cars = carName.value;
  const counts = attemptCount.value

  try {
    validateAttemptCount(counts);
    disableElements(attemptCount, attemptCountButton);

    showCarNames();

    const racingRecords = getFullRacingRecord(cars, counts);
    await playRacing(racingRecords);

    const racingCars = new RacingCar();
    const results = racingCars.getRacingResults(racingRecords, cars)
    const winner = racingCars.getWinner(results);
    printWinner(winner);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
