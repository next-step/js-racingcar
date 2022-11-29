import getRandomNumber from '../model/getRandomNumber.js';
import isOverThresholdScore from '../model/isOverThresholdScore.js';
import { game } from '../constants.js';
import printArrow from './printArrow.js';
import setDatasetForwarCount from './setDatasetForwarCount.js';


export default function displayRacingProcess(counts) {
  const cars = Array.from(document.querySelectorAll('.car-player'));

  for (let i = 0; i < counts; i++) {
    cars
      .filter(it => isOverThresholdScore(getRandomNumber(game.MIN_SCORE, game.MAX_SCORE)))
      .forEach(it => {
        setDatasetForwarCount(it);
        printArrow(it);
      })
  }
}