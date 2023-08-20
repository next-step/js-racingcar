import { getRandomInRange } from '../../utils/getRandomInRange.js';

/**
 * 전진 조건.
 * 해당 값 이상이면 전진할 수 있음.
 */
const MOVE_FORWARD_THRESHOLD = 4;

export const checkCanMoveForward = () =>
  getRandomInRange() >= MOVE_FORWARD_THRESHOLD;
