import MovingStrategy from './MovingStrategy.js';

export default class RandomMovingStrategy extends MovingStrategy {
  // eslint-disable-next-line class-methods-use-this
  isMoveable() {
    const MOVABLE_RANGE_MIN_NUMBER = 0;
    const MOVABLE_RANGE_MAX_NUMBER = 9;
    const MOVABLE_NUMBER = 4;
    return (
      Math.random() * (MOVABLE_RANGE_MAX_NUMBER - MOVABLE_RANGE_MIN_NUMBER) +
        MOVABLE_RANGE_MIN_NUMBER >=
      MOVABLE_NUMBER
    );
  }
}
