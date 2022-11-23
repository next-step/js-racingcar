import getRandomNumber from './getRandomNumber.js';
import { game } from '../constants.js';
import printArrow from '../ui/printArrow.js';

export default function carRacing(cars) {
  const isOverThresholdScore = (score) => score >= game.THRESHOLD_SCORE;
  
  Array.from(cars)
  .filter(it => isOverThresholdScore(getRandomNumber(0, 9)))
  .forEach(it => {
    it.dataset.forwardCount = Number(it.dataset.forwardCount) + 1;
    it.parentNode.insertAdjacentHTML('beforeend', printArrow());
  })
}