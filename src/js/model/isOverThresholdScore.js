import { game } from '../constants.js';

export default function isOverThresholdScore(score) {
  return score >= game.THRESHOLD_SCORE
};