import InvalidOverrideError from './InvalidOverrideError.js';

class CarMoveStrategy {
  isMoveable() {
    throw new InvalidOverrideError();
  }
}

export default CarMoveStrategy;
