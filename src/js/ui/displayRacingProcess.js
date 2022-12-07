import getRandomNumber from '../model/getRandomNumber.js';
import isOverThresholdScore from '../model/isOverThresholdScore.js';
import { game } from '../constants.js';
import printArrow from './printArrow.js';
import setDatasetForwarCount from './setDatasetForwarCount.js';
import printSpinner from './printSpinner.js';
import hideSpinner from './hideSpinner.js';

export default function displayRacingProcess(attemptsCount) {
  return new Promise((resolve) => {
    const cars = document.querySelectorAll('.car-player');
    let count = 0;

    printSpinner();

    let timer = setInterval(() => {
      cars.forEach((it) => {
        if (isOverThresholdScore(getRandomNumber(game.MIN_SCORE, game.MAX_SCORE))) {
          setDatasetForwarCount(it);
          printArrow(it);
        }
      });

      ++count;

      if (count === Number(attemptsCount)) {
        clearInterval(timer);
        hideSpinner();
        resolve();
      }
    }, 1000);
  });
}
