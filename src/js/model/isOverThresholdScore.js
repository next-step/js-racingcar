import { game } from '../constants.js';

export default function isOverThresholdScore(
  score,
  thresholdScore = game.THRESHOLD_SCORE
) {
  return score >= thresholdScore;
}
