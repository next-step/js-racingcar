import { GAME } from '../constant/index.js';
import getRandomNumber from '../util/getRandomNumber.js';

export default function checkThresholdScore(thresholdScore = GAME.THRESHOLD_SCORE) {
  return getRandomNumber(GAME.MIN_SCORE, GAME.MAX_SCORE) >= thresholdScore;
}