import GAME from '../constant';

export function checkThresholdScore(thresholdScore = GAME.THRESHOLD_SCORE) {
  return getRandomNumber(GAME.MIN_SCORE, GAME.MAX_SCORE) >= thresholdScore;
}