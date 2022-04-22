import MovingStrategy from './MovingStrategy.js';

class RandomMovingStrategy extends MovingStrategy {
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

const randomMovingStrategy = new RandomMovingStrategy();
Object.freeze(randomMovingStrategy);
export default randomMovingStrategy;
